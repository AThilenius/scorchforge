angular.module('app').controller('createUserController', [
  '$location',
  '$rootScope',
  '$scope',
  '$log',
  'Person',
  function($location, $rootScope, $scope, $log, Person) {

    $scope.credentials = {};
    $scope.confirmationModel = {};
    //$scope.error = {};

    $scope.credentialsFields = [{
      key: 'firstName',
      type: 'input',
      model: $scope.credentials,
      templateOptions: {
        type: 'text',
        label: 'First Name',
        placeholder: 'Enter your first name',
        required: true
      }
    }, {
      key: 'lastName',
      type: 'input',
      model: $scope.credentials,
      templateOptions: {
        type: 'text',
        label: 'Last Name',
        placeholder: 'Enter your last name',
        required: true
      }
    }, {
      key: 'email',
      type: 'input',
      model: $scope.credentials,
      templateOptions: {
        type: 'email',
        label: 'Email address',
        placeholder: 'Enter email',
        required: true
      }
    }, {
      key: 'password',
      type: 'input',
      model: $scope.credentials,
      templateOptions: {
        type: 'password',
        label: 'Password',
        placeholder: 'Must be more than 5 characters',
        required: true,
        minlength: 5
      }
    }, {
      key: 'confirmPassword',
      type: 'input',
      optionsTypes: ['matchField'],
      model: $scope.confirmationModel,
      templateOptions: {
        type: 'password',
        label: 'Password Confirmation',
        required: true
      },
      data: {
        fieldToMatch: 'password',
        modelToMatch: $scope.credentials
      }
    }];

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
