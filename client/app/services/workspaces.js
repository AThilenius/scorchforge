// Copyright 2015 Alec Thilenius
// All rights reserved.

var app = angular.module('app');

/**
 * Manages a user's LB Workspaces
 */
app.service('workspaces', ['$rootScope', '$mdToast', 'atTextDialog', 'persons',
  function($rootScope, $mdToast, atTextDialog, persons) {

    this.active = null;
    this.activeIndex = null;
    this.all = [];

    this.root_ = null;
    this.context = null;

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
