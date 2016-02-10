// Copyright 2015 Alec Thilenius
// All rights reserved.

// Override ACE base path
ace.config.set('basePath', '/assets/ace');

angular.module('thilenius.ace_editor', [])
  .directive('atAceEditor', [
    '$timeout',
    '$rootScope',
    function($timeout, $rootScope) {
      return {
        restrict: 'AE',
        templateUrl: 'app/directives/ace_editor/ace_editor.htm',
        link: function($scope, $element, $attr) {
          var editor = ace.edit($element[0]);
          window.editor = editor;
          editor.$blockScrolling = Infinity;
          editor.setTheme('ace/theme/twilight');
          editor.getSession().setMode('ace/mode/c_cpp');

          var focus = function(focusEditor) {
            if ($rootScope.focusedFile) {
              $rootScope.focusedFile.focused = false;
            }
            $scope.ephemeral.focused = true;
            $rootScope.focusedFile = $scope.ephemeral;
            if (focusEditor) {
              editor.focus();
            }
          };

          window.attachAce($scope.ephemeral.otDoc, editor);

          editor.on('focus', focus);
        }
      };
    }
  ]);
