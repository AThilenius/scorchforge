// Copyright 2015 Alec Thilenius
// All rights reserved.

angular.module('thilenius.settings', [])
    .directive('atSettings', [
      '$rootScope',
      '$log',
      'Person',
      'md5',
      'aceSettings',
      function($rootScope, $log, Person, md5, aceSettings) {
        return {
          restrict: 'AE',
          templateUrl: 'app/directives/settings/settings.htm',
          link: function($scope, iElement, iAttrs) {

            $scope.settings = aceSettings.values;
            $scope.onChange = function() {
              aceSettings.updateValues($scope.settings);
            };

            // Chips
            $scope.contacts = [];
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
                  person.fullName =
                      `${person.firstName} ${person.lastName}`;
                  person.image = 'http://www.gravatar.com/avatar/' +
                      md5.createHash(person.email);
                });
                $scope.queryContacts = people;
              });
              return $scope.queryContacts;
            };

            function loadContacts() {
              var contacts = [
                'Marina Augustine',
                'Oddr Sarno',
                'Nick Giannopoulos',
                'Narayana Garner',
                'Anita Gros',
                'Megan Smith',
                'Tsvetko Metzger',
                'Hector Simek',
                'Some-guy withalongalastaname'
              ];

              return contacts.map(function(c, index) {
                var cParts = c.split(' ');
                var contact = {
                  name: c,
                  email: cParts[0][0].toLowerCase() + '.' +
                  cParts[1].toLowerCase() + '@example.com',
                  image: 'http://lorempixel.com/50/50/people?' + index
                };
                contact._lowername = contact.name.toLowerCase();
                return contact;
              });
            }

          }
        };
      }
    ]);
