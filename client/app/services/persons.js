// Copyright 2015 Alec Thilenius
// All rights reserved.

var app = angular.module('app');

/**
 * Manages the root of a Person's data (including workspaces)
 */
app.service('persons', ['$rootScope', '$q', '$mdToast', 'Person',
  'atTextDialog', 'otShare',
  function($rootScope, $q, $mdToast, Person, atTextDialog, otShare) {

    const defaultWorkspace = {
      name: 'Personal',
      projects: {
        index: -1,
        items: []
      }
    };

    /**
     * Active root OT Context
     */
    this.context_ = null;

    /**
     * The OT Document with all person metadata in it
     */
    this.otDoc_ = null;

    // Load it up
    if (Person.getCurrentId()) {
      var otDoc = otShare.ot.get('persons', Person.getCurrentId());
      otDoc.subscribe();
      otDoc.whenReady(() => {
        if (!otDoc.type) {
          otDoc.create('json0', {
            workspaces: {
              index: 0,
              items: [defaultWorkspace]
            }
          });
        }
        if (otDoc.type && otDoc.type.name === 'json0') {
          this.context_ = otDoc.createContext();
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
    }

  }
]);
