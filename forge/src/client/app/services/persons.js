// Copyright 2015 Alec Thilenius
// All rights reserved.

var app = angular.module('app');

/**
 * Manages the root of a Person's data (including workspaces)
 */
app.service('persons', ['$rootScope', '$q', '$mdToast', 'Person',
  'atTextDialog', 'otShare',
  function($rootScope, $q, $mdToast, Person, atTextDialog, otShare) {

    const personalWorkspace = {
      name: 'Personal',
      projects: {
        index: -1,
        items: []
      }
    };

    /**
     * Active root OT Context
     */
    this.context = null;

    /**
     * The OT Document with all person metadata in it
     */
    this.otDoc_ = null;

    /**
     * The root context for this users 'share' document
     */
    this.shareContext = null;

    /**
     * The OT Document for the share
     */
    this.shareOtDoc_ =  null;

    // Load it up
    if (Person.getCurrentId()) {
      // Watch persons for workspace/project changes
      var otDoc = otShare.ot.get('persons', Person.getCurrentId());
      otDoc.subscribe();
      otDoc.whenReady(() => {
        if (!otDoc.type) {
          otDoc.create('json0', {
            workspaces: {
              index: 0,
              items: [personalWorkspace]
            }
          });
        }
        if (otDoc.type && otDoc.type.name === 'json0') {
          this.context = otDoc.createContext();
          this.otDoc_ = otDoc;
        } else {
          otDoc.unsubscribe();
          $mdToast.show($mdToast.simple()
            .textContent('Failed to Load Workspace :(')
            .position('top right')
            .hideDelay(6000)
            .theme('error')
          );
        }
      });
      // Also watch for changes to 'shares' and add them to the shared
      // workspace, display a toast when that is done.
      var shareOtDoc = otShare.ot.get('shares', Person.getCurrentId());
      shareOtDoc.subscribe();
      shareOtDoc.whenReady(() => {
        if (!shareOtDoc.type) {
          shareOtDoc.create('json0', {
            sharedProjects: [
              // { ownerFullName, ownderId, name, otDocId }
            ]
          });
        }
        if (shareOtDoc.type && shareOtDoc.type.name === 'json0') {
          this.shareContext = shareOtDoc.createContext().createContextAt([]);
          this.shareOtDoc_ = shareOtDoc;
        } else {
          shareOtDoc.unsubscribe();
        }
      });
    }

  }
]);
