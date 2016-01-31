// Copyright 2015 Alec Thilenius
// All rights reserved.

angular.module('thilenius.tty', [])
  .directive('atTty', [
    '$timeout',
    '$interval',
    function($timeout, $interval) {
      return {
        restrict: 'AE',
        templateUrl: 'app/directives/tty/tty.htm',
        link: function($scope, $element, $attrs) {

          $scope.fontSize = 11;
          $scope.lineWidth = 1.2;
          $scope.size = {
            cols: 120,
            rows: 20
          };
          $scope.element = $element[0].children[0].children[0];

          $scope.getNewRowColSize = function() {
            if (!$scope.canvas) {
              $scope.canvas = document.createElement('canvas');
            }
            var context = $scope.canvas.getContext('2d');
            context.font = 'normal normal ' + $scope.fontSize +
              'px monospace';
            var metrics = context.measureText('a');
            var width = $($scope.element).width();
            var height = $($scope.element).height();
            var cols = Math.floor(width / metrics.width);
            var rows = Math.floor(height / ($scope.fontSize *
              $scope.lineWidth));
            if (cols > 0 && rows > 0 && (cols != $scope.size.cols || rows !=
                $scope.size.rows)) {
              $scope.size = {
                cols: cols,
                rows: rows
              };
              return $scope.size;
            } else {
              return null;
            }
          };

          // TODO(athilenius): A service needs to manage this...
          var socket = io.connect('http://192.168.59.103', {
            path: '/sample/socket.io'
          });

          socket.on('connect', function() {
            var term = new Terminal({
              cols: 120,
              rows: 20,
              useStyle: true,
              screenKeys: true
            });

            term.on('data', function(data) {
              socket.emit('data', data);
            });

            socket.on('data', function(data) {
              term.write(data);
            });

            term.open($scope.element);

            socket.on('disconnect', function() {
              term.destroy();
            });

            // For displaying the first command line
            socket.emit('data', '\n');

            // Resize handler
            // TODO(athilenius): This is JANKY as FUCKKKKK. Ugly, ugly hack
            $interval(function() {
              var newSize = $scope.getNewRowColSize();
              if (newSize) {
                console.log('Resizing to ', newSize);
                term.resize(newSize.cols, newSize.rows);
                socket.emit('resize', newSize);
              }
            }, 500);

          });

        }
      };
    }
  ]);
