// Copyright 2015 Alec Thilenius
// All rights reserved.

angular.module('app').controller('loginController', [
  '$location',
  '$rootScope',
  '$scope',
  'Person',
  function($location, $rootScope, $scope, Person) {
    $scope.login = function() {
      $scope.loginCredentials.email =
          $scope.loginCredentials.email.toLowerCase();
      Person.login($scope.loginCredentials, function(result) {
        $location.path('/forge');
      });
    };
  }
]);
