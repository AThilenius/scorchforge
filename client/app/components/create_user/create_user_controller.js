
angular.module('app').controller('createUserController', [
  '$location',
  '$rootScope',
  '$scope',
  'Person',
  function($location, $rootScope, $scope, Person) {

    $scope.createAccount = function() {
      $scope.createCredentials.email =
          $scope.createCredentials.email.toLowerCase();
      Person.create($scope.createCredentials, function(result) {
        //$location.path('/club');
      }, function(error) {
        $scope.error = 'Woops, something isn\'t right';
      });
    };
  }
]);
