// Copyright 2015 Alec Thilenius
// All rights reserved.

angular.module('app').factory('atTextDialog', [
  '$mdDialog',
  function($mdDialog) {
    return function(properties) {
      properties.ok = properties.ok || 'Okay';
      properties.cancel = properties.cancel || 'Cancel';
      properties.noBlank = properties.noBlank || true;
      return $mdDialog.show({
        controller: ['$scope', '$mdDialog', function($scope,
          $mdDialog) {
          $scope.properties = properties;
          $scope.model = properties.placeholder || '';
          if (properties.change) {
            $scope.$watch('model', function(oldval, newval) {
              properties.change($scope.model);
            });
          }
          $scope.cancel = function() {
            $mdDialog.cancel();
          };
          $scope.okay = function() {
            if ($scope.properties.noBlank && isBlank($scope.model)) {
              $mdDialog.cancel();
            } else {
              $mdDialog.hide($scope.model);
              if ($scope.properties.done) {
                $scope.properties.done($scope.model);
              }
            }
          };
        }],
        templateUrl: 'app/factories/text_dialog/text_dialog.htm',
        parent: angular.element(document.body),
        clickOutsideToClose: true
      });
    };
  }
]);
