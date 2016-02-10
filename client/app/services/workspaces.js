// Copyright 2015 Alec Thilenius
// All rights reserved.

var app = angular.module('app');

/**
 * Manages a user's LB Workspaces
 */
app.service('workspaces', ['$mdToast', 'Person', 'Workspace', 'atTextDialog',
  function($mdToast, Person, Workspace, atTextDialog) {

    this.active = null;
    this.all = [];

    this.add = function(name) {
      return Person.workspaces.create({
        id: Person.getCurrentId()
      }, {
        name
      }, (workspace) => {
        this.addExisting_(workspace);
      });
    };

    this.addExisting_ = function(workspace) {
      this.all.push(workspace);
      if (!this.active) {
        this.active = workspace;
      }
    };

    /**
     * Opens a modal to create a new Workspace
     */
    this.addFromModal = function() {
      var that = this;
      atTextDialog({
        title: 'Workspace Name',
        content: 'New Workspace Name',
        done: (val) => {
          var ws = that.add(val);
          // Once it's made, activate it
          ws.$promise.then((workspace) => {
            that.active = workspace;
          });
          $mdToast.show($mdToast.simple()
            .textContent(`Workspace ${val} created!`)
            .position('top right')
            .hideDelay(3000)
            .theme('success')
          );
        }
      });
    };

    Person.workspaces({
        id: Person.getCurrentId()
      })
      .$promise.then((workspaces) => {
        if (!workspaces || !workspaces.length) {
          // First time the user has ever logged in, create a Personal WS
          this.add('Personal');
        } else {
          workspaces.forEach((workspace) => {
            this.addExisting_(workspace);
          });
        }
      });

  }
]);
