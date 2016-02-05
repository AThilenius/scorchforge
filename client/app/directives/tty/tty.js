// Copyright 2015 Alec Thilenius
// All rights reserved.

angular.module('thilenius.tty', [])
  .directive('atTty', [
    '$timeout',
    '$interval',
    'billet',
    function($timeout, $interval, billet) {
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
          $scope.term = null;
          $scope.termConnected = false;

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

          billet.onReady(function(socket) {
            if (!$scope.term) {
              $scope.termConnected = true;
              var size = $scope.getNewRowColSize();
              console.log('Creating Term');
              $scope.term = new Terminal({
                cols: size.cols,
                rows: size.rows,
                useStyle: true,
                screenKeys: true
              });

              $scope.term.on('data', function(data) {
                socket.emit('data', data);
              });

              socket.on('data', function(data) {
                $scope.term.write(data);
              });

              $scope.term.open($scope.element);

              socket.on('disconnect', function() {
                $scope.term.write(
                  '\r\nLost connection to Billet, trying to reconnect...\r\n'
                );
                $scope.termConnected = false;
              });

              // For displaying the first command line
              socket.emit('data', '\n');

              // Resize handler
              // TODO(athilenius): This is JANKY as FUCKKKKK. Ugly, ugly hack
              $interval(function() {
                var newSize = $scope.getNewRowColSize();
                if (newSize) {
                  console.log('Resizing to ', newSize);
                  $scope.term.resize(newSize.cols, newSize.rows);
                  socket.emit('resize', newSize);
                }
              }, 500);
            } else {
              if (!$scope.termConnected) {
                $scope.term.write('\r\nReconnected!\r\n');
                $scope.termConnected = true;
                socket.on('data', function(data) {
                  $scope.term.write(data);
                });
                socket.emit('data', '\n');
              }
            }
          });

        }
      };
    }
  ]);
