// Copyright 2015 Alec Thilenius
// All rights reserved.
var app = angular.module('app', [
  'lbServices',
  'ngAnimate',
  'ngCookies',
  'ngMaterial',
  'ngMessages',
  'ngFileSaver',
  'dndLists',
  'ui.ace',
  'ui.router',
  'angular-md5',
  'ui.bootstrap.contextMenu',
  'ui.bootstrap',
  'xeditable',
  'thilenius.navbar',
  'thilenius.settings',
  'thilenius.three_visualizer',
  'thilenius.tty',
  'thilenius.sidebar',
  'thilenius.content_window'
]);

app.run([
  'editableOptions',
  function(editableOptions) {
    editableOptions.theme = 'bs3';
  }
]);

app.config([
  '$httpProvider',
  function($httpProvider) {
    $httpProvider.interceptors.push([
      '$q',
      '$location',
      'LoopBackAuth',
      function($q, $location, LoopBackAuth) {
        return {
          responseError: function(rejection) {
            if (rejection.status === 401) {
              // Now clearing the loopback values from client browser for safe
              // logout...
              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();
              $location.nextAfterLogin = $location.path();
              $location.path('/login');
            }
            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);

app.filter('capitalize', function() {
  return function(input) {
    return (!!input) ? input.charAt(0).toUpperCase() +
      input.substr(1).toLowerCase() : '';
  };
});

app.config(['$mdThemingProvider',
  function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('red')
      .dark();
  }
]);
