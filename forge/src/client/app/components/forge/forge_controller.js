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
  'billet',
  function($rootScope, $scope, $location, $mdDialog, $mdToast, $timeout,
    $compile, atTextDialog, metastore, Person, workspaces, projects,
    sourceFiles, atRateLimiter, otShare, atDockspawn, compiler, billet) {
    $scope.forgeVersion = window.FORGE_VERSION;

    //var toast = $mdToast.simple()
      //.textContent('Action Toast!')
      //.action('OK')
      //.action('Reject')
      //.highlightAction(false)
      //.position('top right')
      //.theme('success');
    //$mdToast.show(toast).then(function(response) {
      //if (response == 'ok') {
        //alert('You clicked \'OK\'.');
      //}
    //});

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

    $scope.addSharedProjectFromModal = function() {
      projects.addSharedFromModal();
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
      billet.connect();
    });

  }
]);
