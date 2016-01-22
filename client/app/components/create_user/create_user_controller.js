angular.module('app').controller('createUserController', [
  '$location',
  '$rootScope',
  '$scope',
  'Person',
  function($location, $rootScope, $scope, Person) {

    $scope.credentials = {};
    $scope.confirmationModel = {};

    $scope.credentialsFields = [
      {
        key: 'firstName',
        type: 'input',
        model: $scope.credentials,
        templateOptions: {
          type: 'text',
          label: 'First Name',
          placeholder: 'Enter your first name',
          required: true
        }
      },
      {
        key: 'lastName',
        type: 'input',
        model: $scope.credentials,
        templateOptions: {
          type: 'text',
          label: 'Last Name',
          placeholder: 'Enter your last name',
          required: true
        }
      },
      {
        key: 'email',
        type: 'input',
        model: $scope.credentials,
        templateOptions: {
          type: 'email',
          label: 'Email address',
          placeholder: 'Enter email',
          required: true
        }
      },
      {
        key: 'password',
        type: 'input',
        model: $scope.credentials,
        templateOptions: {
          type: 'password',
          label: 'Password',
          required: true,
          minlength: 5
        }
      },
      {
        key: 'confirmPassword',
        type: 'input',
        optionsTypes: ['matchField'],
        model: $scope.confirmationModel,
        templateOptions: {
          type: 'password',
          label: 'Password Confirmation',
          required: true,
          minlength: 5
        },
        data: {
          fieldToMatch: 'password',
          modelToMatch: $scope.credentials
        }
      }
    ];

    $scope.onSubmit = function() {
      $scope.credentials.email =
          $scope.credentials.email.toLowerCase();
      Person.create($scope.credentials, function(result) {
        //$location.path('/club');
      }, function(error) {
        $scope.error = 'Woops, something isn\'t right';
      });
      alert(JSON.stringify($scope.credentials));
    };
  }
]);
