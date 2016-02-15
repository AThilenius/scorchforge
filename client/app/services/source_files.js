// Copyright 2015 Alec Thilenius
// All rights reserved.

var app = angular.module('app');

/**
 * Manages a Porjects source files.
 */
app.service('sourceFiles', [
  '$rootScope', '$q', '$document', '$mdToast', '$compile', 'atTextDialog',
  'persons', 'workspaces', 'projects', 'otShare', 'atDockspawn',
  function($rootScope, $q, $document, $mdToast, $compile, atTextDialog,
    persons, workspaces, projects, otShare, atDockspawn) {

    this.activeEphemeral = [];
    this.fileTree = null;

    this.root_ = null;
    this.rootContext_ = null;
    this.supressSave_ = false;
    this.ephemeralCache_ = {};

    // Watch for project change events. Need to unload any open source docs
    $rootScope.$watch(() => {
      return projects.active;
    }, (newVal, oldVal) => {
      this.activeEphemeral.forEach((ephemeral) => {
        // Unload the doc
        ephemeral.otDoc.unsubscribe();
        ephemeral.dsData.panelContainer.onCloseButtonClicked();
        delete ephemeral.dsData;
        delete ephemeral.otDoc;
      });
      this.root_ = this.rootContext_ = null;
      this.activeEphemeral = [];
      if (newVal) {
        // Wait for context to be available to get file tree
        projects.activeOtDocFuture.promise.then((otDoc) => {
          // I might be leaking contexts here...
          this.rootContext_ = otDoc.createContext().createContextAt(
            []);
          this.rootContext_.on('child op', () => {
            this.root_ = this.rootContext_.get();
            this.supressSave_ = true;
            this.fileTree = JSON.parse(angular.toJson(this.root_
              .fileTree));
          });
          this.root_ = this.rootContext_.get();
          this.supressSave_ = true;
          this.fileTree = JSON.parse(angular.toJson(this.root_.fileTree));
        });
      }
    });

    // Watch for changes to the file tree, save them when needed
    $rootScope.$watch(() => {
      return this.fileTree;
    }, (newVal, oldVal) => {
      if (this.supressSave_) {
        this.supressSave_ = false;
        return;
      }
      if (newVal) {
        this.rootContext_.set(['fileTree'], JSON.parse(angular.toJson(
          newVal)));
      }
    }, true);

    this.addItemToProject_ = function(list, item) {
      var that = this;
      atTextDialog({
        title: item.type === 'file' ? 'File Name' : 'Directory Name',
        content: item.type === 'file' ? 'New File Name' : 'New Directory Name',
        done: (val) => {
          item.name = val;
          // Add new item to the file tree, it will auto update
          list = list || that.fileTree;
          list.push(item);
          if (item.otDocId) {
            // Also open it. Note this is done to get the OT Doc to create so
            // that Billet sees it
            this.openSourceFile(val, item.otDocId);
          }
          $mdToast.show($mdToast.simple()
            .textContent(
              `${item.type.capitalizeFirstLetter()} ${val} created!`
            )
            .position('top right')
            .hideDelay(3000)
            .theme('success')
          );
        }
      });
    };

    /**
     * Add file from Modal
     */
    this.addFileFromModal = function(list) {
      this.addItemToProject_(list, {
        type: 'file',
        otDocId: newShortUuid()
      });
    };

    /**
     * Add a directory from Modal
     */
    this.addDirectoryFromModal = function(list) {
      this.addItemToProject_(list, {
        type: 'directory',
        children: []
      });
    };

    /**
     * Returns a file's ephemeral object from it's otDocId
     */
    this.getEphemeral = function(otDocId) {
      return this.ephemeralCache_[otDocId] ||
        (this.ephemeralCache_[otDocId] = {
          otDocId
        });
    };

    /**
     * Tries to find a file's ephemral object from a absolute path starting with
     * /root/forge
     */
    this.getEphemeralFromPath = function(path) {
      var parts = path.split('/').filter((part) => {
        return Boolean(part);
      });
      if (parts[0] === 'root' && parts[1] === 'forge' && parts[2] ===
        workspaces.active.name && parts[3] === projects.active.name) {
        // From part 4 onward, search the file tree
        var cursor = {
          children: this.fileTree
        };
        for (var i = 4; i < parts.length && cursor; i++) {
          cursor = _(cursor.children).find((child) => {
            return child.name === parts[i];
          });
        }
        return this.getEphemeral(cursor.otDocId);
      }
      return null;
    };

    /**
     * Opens a editor tab with the otDocId OT Doc loaded into it.
     */
    this.openSourceFile = function(name, otDocId) {
      var existing = _(this.activeEphemeral).find((e) => {
        return e.otDocId === otDocId;
      });
      if (existing) {
        // Bring the window to front
        return;
      }
      // Start by getting/create the OT Document
      var otDoc = otShare.ot.get('source_files', otDocId);
      otDoc.subscribe();
      otDoc.whenReady(() => {
        if (!otDoc.type) {
          otDoc.create('text');
        }
        if (otDoc.type && otDoc.type.name === 'text') {
          // Then create the DockSpawn window with ACE in it
          var dsData = {};
          var ephemeral = this.getEphemeral(otDocId);
          ephemeral.otDocId = otDocId;
          ephemeral.dsData = dsData;
          ephemeral.otDoc = otDoc;
          dsData.domElement = angular.element(
            '<div class="fill" at-ace-editor ephemeral="ephemeral"></div>'
          )[0];
          angular.element(document.getElementsByTagName('body')).append(
            dsData.domElement);
          $compile(dsData.domElement)({
            ephemeral
          });
          dsData.panelContainer = new dockspawn.PanelContainer(dsData
            .domElement,
            atDockspawn.dockManager);
          // Set panel attributes
          dsData.panelContainer.setTitle(name);
          dsData.dockNode = atDockspawn.dockManager.dockFill(
            atDockspawn.documentNode, dsData.panelContainer);
          this.activeEphemeral.push(ephemeral);
          dsData.panelContainer.onClose = (container) => {
            ephemeral.otDoc.unsubscribe();
            delete ephemeral.dsData;
            delete ephemeral.otDoc;
            this.activeEphemeral = _(this.activeEphemeral).without(
              ephemeral);
          };
        } else {
          otDoc.unsubscribe();
          $mdToast.show($mdToast.simple()
            .textContent('Failed to OT Doc for File!')
            .position('top right')
            .hideDelay(6000)
            .theme('error')
          );
        }
      });
    };

  }
]);
