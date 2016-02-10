// Copyright 2015 Alec Thilenius
// All rights reserved.

var app = angular.module('app');

/**
 * Manages a Porjects source files.
 */
app.service('sourceFiles', [
  '$rootScope', '$q', '$document', '$mdToast', '$compile', 'atTextDialog',
  'projects', 'otShare', 'atDockspawn',
  function($rootScope, $q, $document, $mdToast, $compile, atTextDialog,
    projects, otShare, atDockspawn) {

    this.activeEphemeral = [];

    // Watch for project change events. Need to unload any open source docs
    $rootScope.$watch(() => {
      return projects.active;
    }, (newVal, oldVal) => {
      this.activeEphemeral.forEach((ephemeral) => {
        // Unload the doc
        ephemeral.otDoc.promise.then((otDoc) => {
          otDoc.unsubscribe();
        });
      });
      // TODO(athilenius): Need to close windows here
    });

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
