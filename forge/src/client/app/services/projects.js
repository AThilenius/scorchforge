// Copyright 2015 Alec Thilenius
// All rights reserved.

var app = angular.module('app');

/**
 * Manages a user's Projects (JSON only) for the active Workspace
 * TODO(athilenius): This all seems a bit messy, think of a better way to do
 * this, or maybe abstract it out.
 */
app.service('projects', [
  '$rootScope', '$q', '$document', '$mdToast', 'Person', 'atTextDialog',
  'workspaces', 'otShare',
  function($rootScope, $q, $document, $mdToast, Person, atTextDialog,
    workspaces, otShare) {

    /*
     * Represents the active meta object from the parent array (Not the child OT
     * Doc of the actual Project). Note: The meta (this) stores the project
     * name.
     */
    this.active = null;

    /**
     * A FUTURE for OTDoc of the active CHILD, directly on the root
     * Note: has 'ownderId' and 'fileTree' as fields
     */
    this.activeOtDocFuture = null;

    /**
     * Points to the parent array that stores the metadata for projects (with
     * names).
     */
    this.all = [];

    /**
     * The root of the parent document
     */
    this.root_ = null;

    /**
     * The context of the parent document
     */
    this.rootContext_ = null;

    /**
     * Stores all loaded docs as <otDocId, future: otDoc>
     */
    this.otDocCache_ = {};

    /**
     * Watch for workspace switches, workspace.active so we can reload context,
     * unload old wokspaces OT Docs, and load the new ones
     */
    $rootScope.$watch(() => {
      return workspaces.active;
    }, (newVal, oldVal) => {
      this.active = this.root_ = this.activeOtDocFuture = null;
      this.all = [];
      // Unload all project OT Docs and contexts in cache as well
      _.chain(this.otDocCache_).values().each((otDoc) => {
        otDoc.promise.then((otDoc) => {
          otDoc.unsubscribe();
        });
      });
      this.otDocCache_ = {};
      if (newVal) {
        this.rootContext_ = workspaces.context.createContextAt([
          'items',
          workspaces.activeIndex, 'projects'
        ]);
        this.root_ = this.rootContext_.get();
        this.all = this.root_.items;
        // Load all projects (each one lives in it's own OT Doc)
        this.all.forEach((projectMeta) => {
          this.loadOtDocToCache_(projectMeta.otDocId);
        });
        if (this.root_.index >= 0) {
          this.active = this.root_.items[this.root_.index];
        }
      }
    });

    /**
     * Watchs active. When it's set, set the reltive active index in OT Doc, and
     * set contextFuture to the future of the CHILD context.
     */
    $rootScope.$watch(() => {
      return this.active;
    }, (newVal, oldVal) => {
      if (newVal && this.rootContext_) {
        var index = _(this.all).indexOf(newVal);
        if (index >= 0) {
          this.rootContext_.set(['index'], index, () => {});
          this.activeIndex = index;
          this.activeOtDocFuture = $q.defer();
          this.otDocCache_[newVal.otDocId].promise.then((otDoc) => {
            this.activeOtDocFuture.$$resolve(otDoc);
          });
        }
      }
    });

    this.loadOtDocToCache_ = function(otDocId) {
      var future = $q.defer();
      this.otDocCache_[otDocId] = future;
      var otDoc = otShare.ot.get('projects', otDocId);
      otDoc.subscribe();
      otDoc.whenReady(() => {
        if (!otDoc.type) {
          otDoc.create('json0', {
            ownerId: Person.getCurrentId(),
            fileTree: []
          });
        }
        if (otDoc.type && otDoc.type.name === 'json0') {
          future.$$resolve(otDoc);
        } else {
          otDoc.unsubscribe();
          $mdToast.show($mdToast.simple()
            .textContent('Failed to Load Project Document :(')
            .position('top right')
            .hideDelay(6000)
            .theme('error')
          );
        }
      });
      return future;
    };

    /**
     * Opens a modal to create a new Project
     */
    this.addFromModal = function() {
      var that = this;
      atTextDialog({
        title: 'Project Name',
        content: 'New Project Name',
        done: (val) => {
          var project = {
            name: val,
            sharedWith: [],
            otDocId: newShortUuid()
          };
          that.rootContext_.push(['items'], project, () => {
            // Also open the doc and add it to cache
            this.loadOtDocToCache_(project.otDocId).promise.then(() => {
              that.active = this.all[this.all.length - 1];
              $mdToast.show($mdToast.simple()
                .textContent(`Project ${val} created!`)
                .position('top right')
                .hideDelay(3000)
                .theme('success')
              );
            });
          });
        }
      });
    };

    this.addSharedFromModal = function() {
      var that = this;
      atTextDialog({
        title: 'Project Name',
        content: 'New Project Name',
        showSecond: true,
        secondContent: 'Shared Project ID',
        done: (val, second) => {
          var project = {
            name: val,
            sharedWith: [],
            otDocId: second
          };
          // Quick sanity check
          if (!second || second.length < 4) {
            return;
          }
          that.rootContext_.push(['items'], project, () => {
            // Also open the doc and add it to cache
            this.loadOtDocToCache_(project.otDocId).promise.then(() => {
              that.active = this.all[this.all.length - 1];
              $mdToast.show($mdToast.simple()
                .textContent(`Project ${val} created!`)
                .position('top right')
                .hideDelay(3000)
                .theme('success')
              );
            });
          });
        }
      });
    };

  }
]);
