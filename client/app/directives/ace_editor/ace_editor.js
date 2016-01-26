// Copyright 2015 Alec Thilenius
// All rights reserved.

// Override ACE base path
ace.config.set('basePath', '/assets/ace');

angular.module('thilenius.ace_editor', [])
  .directive('atAceEditor', [
    '$timeout',
    'metastore',
    function($timeout, metastore) {
      return {
        restrict: 'AE',
        templateUrl: 'app/directives/ace_editor/ace_editor.htm',
        link: function($scope, iElement, iAttrs) {
          var editor = ace.edit('editor');
          editor.$blockScrolling = Infinity;
          editor.on(
            'change',
            function(e) {
              $scope.changeHandler(e);
            });
          $scope.changeHandler = function() {};

          $scope.$watch(
            'state.activeFile',
            function(newVal, oldVal) {
              if (newVal === oldVal) {
                return;
              }
              var meta = metastore.meta(newVal);
              var model = metastore.model(newVal);
              var ephemeral = metastore.ephemeral(newVal);
              ephemeral.sesion = ephemeral.session ||
                ace.createEditSession(model.checkout(), 'ace/mode/c_cpp');
              editor.setSession(ephemeral.sesion);
              editor.setReadOnly(ephemeral.readOnly);
              $scope.changeHandler = function(e) {
                $timeout.cancel($scope.timeout);
                $scope.timeout = $timeout(function() {
                  model.stage(editor.getValue());
                }, 500);
              };
            });

          // I'll need these later
          //scope.editor.scrollToLine(row, true, true, function() {});
          //scope.editor.gotoLine(row, column - 1, true);
        }
      };
    }
  ]);
