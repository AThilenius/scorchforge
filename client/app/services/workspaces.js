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
    this.context_ = null;

    /**
     * Watch for persons switches, persons.active so we can reload context
     */
    $rootScope.$watch(() => {
      return persons.context_;
    }, (newVal, oldVal) => {
      console.log('Workspaces sees Person change');
      this.active = this.activeIndex = this.root_ = null;
      this.all = [];
      if (this.context_) {
        this.context_.destroy();
        this.context_ = null;
      }
      if (newVal) {
        if (this.context_) {
          this.context_.destroy();
          this.context_ = null;
        }
        this.context_ = persons.context_.createContextAt(['workspaces']);
        this.root_ = this.context_.get();
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
      console.log('Workspace sees Active change');
      if (newVal && this.context_) {
        var index = _(this.all).indexOf(newVal);
        console.log('Workspace sees Active change with index: ', index);
        if (index >= 0) {
          this.context_.set(['index'], index, () => {});
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
          that.context_.push(['items'], workspace, () => {
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
