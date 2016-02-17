// Copyright 2015 Alec Thilenius
// All rights reserved.

var forgeApp = angular.module('app');

(function($) {
  $.event.special.destroyed = {
    remove: function(o) {
      if (o.handler) {
        o.handler();
      }
    }
  };
})(jQuery);

/**
 * This is the high level controller for the Forge editor. It holds most of the
 * editors state and data, like workspace, projects, and so on.
 */
forgeApp.controller('forgeController', [
  '$rootScope',
  '$scope',
  '$location',
  '$mdDialog',
  '$mdToast',
  '$timeout',
  '$compile',
  'atTextDialog',
  'metastore',
  'Person',
  'workspaces',
  'projects',
  'sourceFiles',
  'atRateLimiter',
  'otShare',
  'atDockspawn',
  'compiler',
  function($rootScope, $scope, $location, $mdDialog, $mdToast, $timeout,
    $compile, atTextDialog, metastore, Person, workspaces, projects,
    sourceFiles, atRateLimiter, otShare, atDockspawn, compiler) {
    $scope.forgeVersion = window.FORGE_VERSION;

    // Global state object (not intended for serialization)
    $scope.state = {
      viewingAsRole: 'student'
    };

    $scope.person = Person.getCurrent((person) => {
      $scope.state.viewingAsRole = person.role;
    });

    // Bind for in-view calling
    $scope.addProjectFromModal = function() {
      projects.addFromModal();
    };

    // Bind for in-view calling
    $scope.addWorkspaceFromModal = function() {
      workspaces.addFromModal();
    };

    // Bind for in-view calling
    $scope.openFile = function(name, otDocId) {
      sourceFiles.openSourceFile(name, otDocId);
    };

    // Allow DockSpawn to setup now
    $timeout(() => {
      atDockspawn.setup();
    });

  }
]);
