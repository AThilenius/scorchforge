angular.module('app').controller('createUserController', [
  '$location',
  '$rootScope',
  '$scope',
  '$log',
  'Person',
  function($location, $rootScope, $scope, $log, Person) {
    $scope.showPassword = false;

    $scope.togglePassword = function() {
      $scope.showPassword = !($scope.showPassword);
    };

    $scope.onSubmit = function() {
      $scope.credentials.email =
          $scope.credentials.email.toLowerCase();
      Person.create($scope.credentials, function(result) {
        Person.login($scope.credentials, function(result) {
          $location.path('/forge');
        });
      }, function(error) {
        var errorList = error.data.error.details.messages;
        var errors = Object.keys(errorList);
        $log.debug(errors);
        $scope.error = '';
        for (var key in errorList) {
          // TODO: Make the printing a little more clever
          $scope.error += errorList[key] + ';\n';
        }
      });
    };
  }
]);
