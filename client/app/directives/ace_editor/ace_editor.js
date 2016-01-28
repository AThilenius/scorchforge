// Copyright 2015 Alec Thilenius
// All rights reserved.

// Override ACE base path
ace.config.set('basePath', '/assets/ace');

angular.module('thilenius.ace_editor', [])
  .directive('atAceEditor', [
    '$timeout',
    function($timeout) {
      return {
        restrict: 'AE',
        templateUrl: 'app/directives/ace_editor/ace_editor.htm',
        link: function($scope, $element, $attr) {
          var editor = ace.edit($element[0]);
          editor.$blockScrolling = Infinity;
          editor.on(
            'change',
            function(e) {
              $scope.changeHandler(e);
            });
          $scope.changeHandler = function() {};

          var ephemeral = $scope.file.links.ephemeral;
          ephemeral.sesion = ephemeral.session || ace.createEditSession(
            $scope.file.links.model.checkout(), 'ace/mode/c_cpp');
          editor.setSession(ephemeral.sesion);
          editor.setReadOnly(ephemeral.readOnly);
          $scope.changeHandler = function(e) {
            $timeout.cancel($scope.timeout);
            $scope.timeout = $timeout(function() {
              $scope.file.links.model.stage(editor.getValue());
            }, 500);
          };

          // I'll need these later
          //scope.editor.scrollToLine(row, true, true, function() {});
          //scope.editor.gotoLine(row, column - 1, true);
        }
      };
    }
  ]);
