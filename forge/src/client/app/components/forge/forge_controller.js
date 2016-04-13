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
  '$rootScope', '$scope', '$location', '$mdDialog', '$mdToast', '$timeout',
  '$compile', 'atTextDialog', 'metastore', 'Person', 'data', 'atRateLimiter',
  'otShare', 'atDockspawn', 'compiler', 'billet',
  function($rootScope, $scope, $location, $mdDialog, $mdToast, $timeout,
    $compile, atTextDialog, metastore, Person, data, atRateLimiter, otShare,
    atDockspawn, compiler, billet) {

    // Pull Forge build version number from global.
    $scope.forgeVersion = window.FORGE_VERSION;

    // Represents the active content window. This is used for things like
    // contextual menues (like the toolbar).
    $scope.activeContent = null;

    // Global state object (not intended for serialization).
    $scope.state = {
      viewingAsRole: 'student'
    };

    // Load up the current person and set their role.
    $scope.person = Person.getCurrent((person) => {
      $scope.state.viewingAsRole = person.role;
    });

    // Bind for in-view calling
    $scope.addProjectFromModal = function() {
      data.addProject();
    };

    $scope.addSharedProjectFromModal = function() {
      data.addSharedProject();
    };

    // Bind for in-view calling
    $scope.addWorkspaceFromModal = function() {
      data.addWorkspace();
    };

    // Allow DockSpawn to setup now
    $timeout(() => {
      atDockspawn.setup();
      data.loadAllData();
      billet.connect();
    });

  }
]);
