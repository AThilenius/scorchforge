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

    /**
     * All otDocs for all source files in the loaded project in the form:
     * <otDocId, future<otDoc>>
     */
    this.otDocCache_ = {};

    // Watch for project change events. Need to unload any open source docs
    $rootScope.$watch(() => {
      return projects.active;
    }, (newVal, oldVal) => {
      // Close all DockSpawn windows
      this.activeEphemeral.forEach((ephemeral) => {
        // Unload the doc
        ephemeral.otDoc.unsubscribe();
        ephemeral.dsData.panelContainer.onCloseButtonClicked();
        delete ephemeral.dsData;
        delete ephemeral.otDoc;
      });
      // Unsubscribe all source files
      _.chain(this.otDocCache_).values().each((otDoc) => {
        otDoc.promise.then((otDoc) => {
          otDoc.unsubscribe();
        });
      });
      this.otDocCache_ = {};
      this.root_ = this.rootContext_ = null;
      this.activeEphemeral = [];
      if (newVal) {
        // Wait for context to be available to get file tree
        projects.activeOtDocFuture.promise.then((otDoc) => {
          // I might be leaking contexts here...
          this.rootContext_ = otDoc.createContext().createContextAt(
            []);
          var doFn = () => {
            this.root_ = this.rootContext_.get();
            this.supressSave_ = true;
            this.fileTree = JSON.parse(angular.toJson(this.root_.fileTree));
            // Load all not-loaded OT Docs into cache
            this.fileTree.eachRecursive('children', (item) => {
              this.loadOtDoc_(item.otDocId);
            });
          };
          this.rootContext_.on('child op', doFn);
          doFn();
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

    this.loadOtDoc_ = function(otDocId) {
      if (otDocId && !this.otDocCache_[otDocId]) {
        var otDoc = otShare.ot.get('source_files', otDocId);
        var future = $q.defer();
        otDoc.subscribe();
        otDoc.whenReady(() => {
          if (!otDoc.type) {
            otDoc.create('text');
          }
          if (otDoc.type && otDoc.type.name === 'text') {
            future.$$resolve(otDoc);
          } else {
            otDoc.unsubscribe();
          }
        });
        this.otDocCache_[otDocId] = future;
      }
      return this.otDocCache_[otDocId];
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
        existing.dsData.dockNode.parent.container.tabHost.setActiveTab(
          existing.dsData.dockNode.container);
        return;
      }
      // Start by getting the OT Document
      this.loadOtDoc_(otDocId).promise.then((otDoc) => {
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
      });
    };

    /**
     * Snapshots all files into a Zip BLOB. This will be sent back in a callback
     * because we 'might' not have finished loading all the files yet.
     */
    this.snapshotFilesToZip = function(cb) {
      if (!this.fileTree) {
        return;
      }
      var zip = new JSZip();
      // Flatten the tree of { relativePath: ..., otDocId: ... }
      var pathToOtDocId = [];
      var flatten = (tree, path) => {
        if (!tree) {
          return;
        }
        tree.forEach((item) => {
          if (item.otDocId) {
            pathToOtDocId.push({
              relativePath: path + '/' + item.name,
              otDocId: item.otDocId
            });
          }
          flatten(item.children, path + '/' + item.name);
        });
      };
      flatten(this.fileTree, '');
      var itemCount = pathToOtDocId.length;
      pathToOtDocId.forEach((tuple) => {
        // Get the data from the (potentially not-yet loaded) Ot Doc
        this.loadOtDoc_(tuple.otDocId).promise.then((otDoc) => {
          zip.file(tuple.relativePath, otDoc.getSnapshot());
          if (--itemCount === 0) {
            // We are done loading, invoke the callback
            cb(zip.generate({
              type: 'blob'
            }));
          }
        });
      });
    };

  }
]);
