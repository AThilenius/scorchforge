// Copyright 2015 Alec Thilenius
// All rights reserved.

angular.module('thilenius.context_toolbar', [])
  .directive('atContextToolbar', [function() {
    return {
      restrict: 'AE',
      templateUrl: 'app/directives/context_toolbar/context_toolbar.htm',
      link: function($scope, $element, $attrs) {
        $scope.sceneGraph = {
          name: 'root',
          children: [{
            name: 'Body',
            children: []
          }, {
            name: 'Rotor',
            children: [

            ]
          }]
        };
        $scope.selectedItem = null;
        // Use $scope.activeContent to get at the active content window
        // directive.
        $scope.$watch('activeContent', (newVal, oldVal) => {
          console.log(newVal);
        });

        /**
         * Called from the view to select a scene graph item. This will be used
         * to modify raycasting and so on.
         */
        $scope.selectItem = function(item) {
          $scope.selectedItem = item;
          $scope.activeContent.modelTree.activateNode(item);
        };
      }
    };
  }]);
