// Copyright 2015 Alec Thilenius
// All rights reserved.

var app = angular.module('app');

/**
 * Manages a user's ShareJS Workspaces
 */
app.service('workspaces', ['$rootScope', '$mdToast', 'atTextDialog', 'persons',
  function($rootScope, $mdToast, atTextDialog, persons) {

    this.active = null;
    this.activeIndex = null;
    this.all = [];

    this.root_ = null;
    this.context = null;

    const sharedWithMeWorkspace_ = {
      name: 'Shared With Me',
      shared: true,
      projects: {
        index: -1,
        items: []
      }
    };

    /**
     * Watch for persons switches, persons.active so we can reload context
     */
    $rootScope.$watch(() => {
      return persons.context;
    }, (newVal, oldVal) => {
      this.active = this.activeIndex = this.root_ = null;
      this.all = [];
      if (this.context) {
        this.context.destroy();
        this.context = null;
      }
      if (newVal) {
        if (this.context) {
          this.context.destroy();
          this.context = null;
        }
        this.context = persons.context.createContextAt(['workspaces']);
        this.root_ = this.context.get();
        this.all = this.root_.items;
        if (this.root_.index >= 0) {
          this.active = this.root_.items[this.root_.index];
          this.activeIndex = this.root_.index;
        }
      }
    });

    /**
     * Watch for changes to the 'share' doc for sharing projects.
     */
    $rootScope.$watch(() => {
      return persons.shareContext;
    }, (newVal, oldVal) => {
      if (newVal && persons.context && this.context) {
        var addProjectsToSharedWs = (sharedWs, projects) => {
          projects.forEach((project) => {
            // See if the workspace already has this project. Go by otDocId
            var existingProject = _(project.items).find((p) => {
              return p.otDocId === project.otDocId;
            });
            if (!existingProject) {
              // Add the project
              sharedWs.push(['items'], {
                ownerId: project.ownerId,
                name: project.name,
                otDocId: project.otDocId
              }, () => {
                // Also open the doc and add it to cache
                this.loadOtDocToCache_(project.otDocId).promise .then(() => {
                  $mdToast.show($mdToast.simple()
                    .textContent(project.ownerFullName + ' shared ' +
                      project.name + ' with you!')
                    .position('top right')
                    .hideDelay(3000)
                    .theme('success')
                  );
                });
              });
            }
          });
        };
        // Takes in the root JSON node for the 'shared' doc, creates a 'Shared
        // With Me' workspaces if needed and adds any missing shared docs to
        // that workspace.
        var loadShared = (shareRoot) => {
          var existing = _(this.all).find((ws) => {
            return ws.shared;
          });
          if (!existing) {
            // Create the shared workspace
            this.context.push(['items'], sharedWithMeWorkspace_, () => {
              var newWs = this.all[this.all.length - 1];
              addProjectsToSharedWs(newWs, newVal.get());
            });
          } else {
            addProjectsToSharedWs(sharedWithMeWorkspace, newVal.get());
          }
        };
      }
    });

    /**
     * Watchs active. When it's set, set the reltive active index in OT Doc.
     */
    $rootScope.$watch(() => {
      return this.active;
    }, (newVal, oldVal) => {
      if (newVal && this.context) {
        var index = _(this.all).indexOf(newVal);
        if (index >= 0) {
          this.context.set(['index'], index, () => {});
          this.activeIndex = index;
        }
      }
    });

    /**
     * Opens a modal to create a new Workspace
     */
    this.addFromModal = function() {
      var that = this;
      atTextDialog({
        title: 'Workspace Name',
        content: 'New Workspace Name',
        done: (val) => {
          var workspace = {
            name: val,
            projects: {
              index: -1,
              items: []
            }
          };
          that.context.push(['items'], workspace, () => {
            that.active = this.all[this.all.length - 1];
            $mdToast.show($mdToast.simple()
              .textContent(`Workspace ${val} created!`)
              .position('top right')
              .hideDelay(3000)
              .theme('success')
            );
          });
        }
      });
    };

  }
]);
