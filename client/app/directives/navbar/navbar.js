// Copyright 2015 Alec Thilenius
// All rights reserved.

angular.module('thilenius.navbar', [])
  .config(function($mdIconProvider, $mdThemingProvider) {
    $mdIconProvider
      .defaultIconSet('img/icons/sets/core-icons.svg', 24);
    $mdThemingProvider.theme('default').dark();
  })
  .filter('keyboardShortcut', function($window) {
    return function(str) {
      if (!str) {
        return;
      }
      var keys = str.split('-');
      var isOSX = /Mac OS X/.test($window.navigator.userAgent);

      var seperator = (!isOSX || keys.length > 2) ? '+' : '';

      var abbreviations = {
        M: isOSX ? '' : 'Ctrl',
        A: isOSX ? 'Option' : 'Alt',
        S: 'Shift'
      };

      return keys.map(function(key, index) {
        var last = index == keys.length - 1;
        return last ? key : abbreviations[key];
      }).join(seperator);
    };
  })
  .directive('atNavbar', [
    '$rootScope',
    '$location',
    '$mdToast',
    'Person',
    'workspaces',
    'projects',
    function($rootScope, $location, $mdToast, Person, workspaces, projects) {
      return {
        templateUrl: 'app/directives/navbar/navbar.htm',
        link: function($scope, iElement, iAttrs) {

          $scope.workspaces = workspaces;
          $scope.projects = projects;

          $scope.logout = function() {
            Person.logout();
            $location.path('/login');
          };

          $scope.run = function() {
            $mdToast.show($mdToast.simple()
              .textContent('Please use shell to run, for now')
              .position('top right')
              .hideDelay(6000)
              .theme('error')
            );
          };

        }
      };
    }
  ]);
