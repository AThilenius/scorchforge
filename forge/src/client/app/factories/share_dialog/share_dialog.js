// Copyright 2015 Alec Thilenius
// All rights reserved.

angular.module('app').factory('atShareDialog', [
  '$mdDialog',
  function($mdDialog) {
    return function(properties) {
      return $mdDialog.show({
        controller: ['$scope', '$mdDialog', 'md5', 'Person',
          function($scope, $mdDialog, md5, Person) {
            $scope.properties = properties;

            // Chips
            $scope.queryContacts = [];

            $scope.querySearch = function(query) {
              Person.find({
                filter: {
                  where: {
                    or: [{
                      email: {
                        'regexp': `${query}/i`
                      },
                    }, {
                      firstName: {
                        'regexp': `${query}/i`
                      },
                    }, {
                      lastName: {
                        'regexp': `${query}/i`
                      },
                    }]
                  },
                  limit: 4
                }
              }, (people) => {
                people.forEach((person) => {
                  person.fullName = person.firstName.capitalizeFirstLetter() +
                    ' ' + person.lastName.capitalizeFirstLetter();
                  person.image =
                    'http://www.gravatar.com/avatar/' +
                    md5.createHash(person.email);
                });
                $scope.queryContacts = people;
              });
              return $scope.queryContacts;
            };

            $scope.cancel = function() {
              $mdDialog.cancel();
            };

            $scope.okay = function() {
              $mdDialog.hide();
            };

          }
        ],
        templateUrl: 'app/factories/share_dialog/share_dialog.htm',
        parent: angular.element(document.body),
        clickOutsideToClose: true
      });
    };
  }
]);
