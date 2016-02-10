// Copyright 2015 Alec Thilenius
// All rights reserved.

angular.module('thilenius.icon_bar', [])
  .directive('atIconBar', [
    function() {
      return {
        restrict: 'AE',
        templateUrl: 'app/directives/icon_bar/icon_bar.htm',
        link: function(scope, iElement, iAttrs) {

        }
      };
    }
  ]);
