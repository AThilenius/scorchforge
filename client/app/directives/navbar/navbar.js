// Copyright 2015 Alec Thilenius
// All rights reserved.

angular.module('thilenius.navbar', [])
    .directive('atNavbar', [
        '$rootScope',
        '$location',
        'Person',
        function ($rootScope, $location, Person) {
            return {
                templateUrl: 'app/directives/navbar/navbar.htm',
                link: function ($scope, iElement, iAttrs) {

                    $scope.logout = function () {
                        Person.logout();
                        $location.path('/login');
                    };

                }
            };
        }
    ]);
