angular.module('app').controller('createUserController', [
    '$location',
    '$rootScope',
    '$scope',
    'Person',
    function ($location, $rootScope, $scope, Person) {


        $scope.credentials = {};

        $scope.credentialsFields = [
            {
                key: "firstName",
                type: "input",
                templateOptions: {
                    type: 'text',
                    label: 'First Name',
                    placeholder: 'Enter your first name',
                    required: true
                }
            },
            {
                key: "lastName",
                type: "input",
                templateOptions: {
                    type: 'text',
                    label: 'Last Name',
                    placeholder: 'Enter your last name',
                    required: true
                }
            },
            {
                key: "email",
                type: "input",
                templateOptions: {
                    type: 'email',
                    label: 'Email address',
                    placeholder: 'Enter email',
                    required: true
                }
            },
            {
                key: "password",
                type: "input",
                templateOptions: {
                    type: "password",
                    label: "Password",
                    required: true,
                    minlength: 5
                }
            }
        ];

        $scope.onSubmit = function () {
            $scope.credentials.email =
                $scope.credentials.email.toLowerCase();
            Person.create($scope.credentials, function (result) {
                //$location.path('/club');
            }, function (error) {
                $scope.error = 'Woops, something isn\'t right';
            });
        };
    }
]);
