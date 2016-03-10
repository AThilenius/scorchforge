// Copyright 2015 Alec Thilenius
// All rights reserved.

angular.module('thilenius.navbar', [])
  .config(['$mdIconProvider', '$mdThemingProvider',
    function($mdIconProvider, $mdThemingProvider) {
      $mdIconProvider
        .defaultIconSet('img/icons/sets/core-icons.svg', 24);
      $mdThemingProvider.theme('default').dark();
      $mdThemingProvider.theme('success');
      $mdThemingProvider.theme('error');
    }
  ])
  .filter('keyboardShortcut', ['$window', function($window) {
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
  }])
  .directive('atNavbar', [
    '$location',
    '$mdToast',
    'Person',
    'data',
    function($location, $mdToast, Person, data) {
      return {
        templateUrl: 'app/directives/navbar/navbar.htm',
        link: function($scope, iElement, iAttrs) {

          $scope.data = data;

          $scope.logout = function() {
            data.flushData();
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

          $scope.activateWorkspace = function(workspace) {
            data.activateWorkspace(workspace);
          };

          $scope.activateProject = function(project) {
            data.activateProject(project);
          };

        }
      };
    }
  ]);
