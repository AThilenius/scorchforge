// Copyright 2015 Alec Thilenius
// All rights reserved.

var app = angular.module('app');

/**
 * Manages a user's Projects (JSON only) for the active Workspace
 */
app.service('projects', [
  '$rootScope', '$q', '$document', '$mdToast', 'atTextDialog', 'workspaces',
  'otShare',
  function($rootScope, $q, $document, $mdToast, atTextDialog, workspaces,
    otShare) {

    this.active = null;
    this.activeEphemeral = null;
    this.all = [];

    // Watch active. When it's loaded, we need to load the OT Document and unload
    // any old ones
    $rootScope.$watch(() => {
      return this.active;
    }, (newVal, oldVal) => {
      if (oldVal) {
        // TODO(athilenius): Close open editor windows
        this.activeEphemeral.otDoc.promise.then((otDoc) => {
          otDoc.unsubscribe();
        });
      }
      if (newVal) {
        this.activeEphemeral = {
          otDoc: $q.defer()
        };
        var otDoc = otShare.ot.get('projects', newVal.otDocId);
        otDoc.subscribe();
        otDoc.whenReady(() => {
          if (!otDoc.type) {
            otDoc.create('json0');
          }
          if (otDoc.type && otDoc.type.name === 'json0') {
            this.activeEphemeral.otDoc.$$resolve(otDoc);
          } else {
            otDoc.unsubscribe();
            this.activeEphemeral.otDoc.$$reject(
              'Failed to get or create OT Doc');
          }
        });
      }
    });

    /**
     * Adds a project to the current Workspace
     */
    this.add = function(name) {
      var project = {
        name,
        otDocId: newShortUuid()
      };
      // Remember: all is bound to workspaces.active.projects
      workspaces.active.projects.push(project);
      workspaces.active.$save();
      this.all = workspaces.active.projects;
      return project;
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
          // Create it and activate it
          that.active = that.add(val);
          $mdToast.show($mdToast.simple()
            .textContent(`Project ${val} created!`)
            .position('top right')
            .hideDelay(3000)
            .theme('success')
          );
        }
      });
    };

    this.loadFromWorkspace_ = function(workspace) {
      if (workspace) {
        // Let the watch handler unload it
        this.active = null;
        workspace.projects = workspace.projects || [];
        this.all = workspace.projects;
      }
    };

    // Watch for changes to active workspace
    $rootScope.$watch(() => {
      return workspaces.active;
    }, (newVal, oldVal) => {
      this.loadFromWorkspace_(newVal);
    });

    this.loadFromWorkspace_(workspaces.active);

  }
]);
