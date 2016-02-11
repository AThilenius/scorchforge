// Copyright 2015 Alec Thilenius
// All rights reserved.

var app = angular.module('app');

/**
 * Manages a user's Projects (JSON only) for the active Workspace
 */
app.service('projects', [
  '$rootScope', '$q', '$document', '$mdToast', 'atTextDialog', 'workspaces',
  function($rootScope, $q, $document, $mdToast, atTextDialog, workspaces) {

    this.active = null;
    this.activeIndex = null;
    this.all = [];

    this.root_ = null;
    this.context_ = null;

    /**
     * Watch for workspace switches, workspace.active so we can reload context
     */
    $rootScope.$watch(() => {
      return workspaces.active;
    }, (newVal, oldVal) => {
      console.log('Projects sees Workspace change');
      this.active = this.activeIndex = this.root_ = null;
      this.all = [];
      if (this.context_) {
        this.context_.destroy();
        this.context_ = null;
      }
      if (newVal) {
        this.context_ = workspaces.context_.createContextAt(['items',
          workspaces.activeIndex, 'projects'
        ]);
        this.root_ = this.context_.get();
        this.all = this.root_.items;
        if (this.root_.index >= 0) {
          this.active = this.root_.items[this.root_.index];
        }
      }
    });

    /**
     * Watchs active. When it's set, set the reltive active index in OT Doc.
     */
    $rootScope.$watch(() => {
      return this.active;
    }, (newVal, oldVal) => {
      console.log('Projects sees Active change');
      if (newVal && this.context_) {
        var index = _(this.all).indexOf(newVal);
        if (index >= 0) {
          this.context_.set(['index'], index, () => {});
          this.activeIndex = index;
        }
      }
    });

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
            fileTree: {
              children: []
            }
          };
          that.context_.push(['items'], project, () => {
            that.active = this.all[this.all.length - 1];
            $mdToast.show($mdToast.simple()
              .textContent(`Project ${val} created!`)
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
