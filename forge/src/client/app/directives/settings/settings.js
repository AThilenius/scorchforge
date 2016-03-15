// Copyright 2015 Alec Thilenius
// All rights reserved.

angular.module('thilenius.settings', [])
  .directive('atSettings', [
    '$rootScope', '$log', 'Person', 'aceSettings',
    function($rootScope, $log, Person, aceSettings) {
      return {
        restrict: 'AE',
        templateUrl: 'app/directives/settings/settings.htm',
        link: function($scope, iElement, iAttrs) {

          $scope.settings = aceSettings.values;
          $scope.onChange = function() {
            aceSettings.updateValues($scope.settings);
          };

        }
      };
    }
  ]);
