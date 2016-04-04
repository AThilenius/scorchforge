// Copyright 2015 Alec Thilenius
// All rights reserved.

var app = angular.module('app');

/**
 * Manages all DockSpawn windows
 */
app.service('atDockspawn', [function() {

  this.setup = function() {
    var divDockManager = document.getElementById('my_dock_manager');
    var divTopBar = document.getElementById('topbar');
    this.dockManager = new dockspawn.DockManager(divDockManager);
    this.dockManager.initialize();
    // Let the dock manager element fill in the entire screen
    var onresized = (e) => {
      this.dockManager.resize(window.innerWidth,
        // The offsetHeight is from the topbar, the 4 is from the nav-h-bar
        window.innerHeight - (Math.max(divTopBar.offsetHeight, 28))
      );
    };
    window.onresize = onresized;
    onresized(null);
    var project = new dockspawn.PanelContainer(document.getElementById(
      'projectWindow'), this.dockManager);
    var settings = new dockspawn.PanelContainer(document.getElementById(
      'settingsWindow'), this.dockManager);
    var output = new dockspawn.PanelContainer(document.getElementById(
      'outputWindow'), this.dockManager);
    var demo = new dockspawn.PanelContainer(document.getElementById(
      'demoWindow'), this.dockManager);
    // Dock the panels on the dock manager
    this.documentNode = this.dockManager.context.model.documentManagerNode;
    this.projectNode = this.dockManager.dockLeft(
      this.documentNode, project, 0.3);
    this.settingsNode = this.dockManager.dockFill(
      this.projectNode, settings, 0.3);
    this.projectNode.parent.container.tabHost.setActiveTab(
      this.projectNode.container);
    this.outputNode = this.dockManager.dockDown(this.documentNode,
      output, 0.3);
    this.demoNode = this.dockManager.dockFill(this.documentNode, demo);
  };

}]);
