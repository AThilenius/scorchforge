// Copyright 2015 Alec Thilenius
// All rights reserved.

var app = angular.module('app');

/**
 * Manages a Porjects source files.
 */
app.service('sourceFiles', [
  '$rootScope', '$q', '$document', '$mdToast', '$compile', 'atTextDialog',
  'persons', 'projects', 'otShare', 'atDockspawn',
  function($rootScope, $q, $document, $mdToast, $compile, atTextDialog,
    persons, projects, otShare, atDockspawn) {

    this.activeEphemeral = [];
    this.fileTree = null;

    this.root_ = null;
    this.context_ = null;
    this.supressSave_ = false;

    // Watch for project change events. Need to unload any open source docs
    $rootScope.$watch(() => {
      return projects.active;
    }, (newVal, oldVal) => {
      console.log('SourceFiles sees Projects change');
      this.activeEphemeral.forEach((ephemeral) => {
        // Unload the doc
        ephemeral.otDoc.unsubscribe();
        ephemeral.dsData.panelContainer.onCloseButtonClicked();
      });
      if (this.context_) {
        this.context_.destroy();
        this.context_ = null;
      }
      if (newVal) {
        this.context_ = projects.context_.createContextAt(['items',
          projects.activeIndex, 'fileTree'
        ]);
        this.context_.on('child op', () => {
          this.root_ = this.context_.get();
          this.supressSave_ = true;
          this.fileTree = JSON.parse(angular.toJson(this.root_.children));
        });
        // Supress error in ShareDB
        this.context_.on('op', () => {});
        this.root_ = this.context_.get();
        this.supressSave_ = true;
        this.fileTree = JSON.parse(angular.toJson(this.root_.children));
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
        this.context_.set(['children'], JSON.parse(angular.toJson(newVal)));
        console.log('Saving FileTree');
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
          var ephemeral = {
            dsData,
            name,
            otDocId,
            otDoc
          };
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
