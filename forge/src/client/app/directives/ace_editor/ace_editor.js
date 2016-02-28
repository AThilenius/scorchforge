// Copyright 2015 Alec Thilenius
// All rights reserved.

// Override ACE base path
var requireImpl = ace.require != null ? ace.require : require;
ace.config.set('basePath', '/assets/ace');
var Range = requireImpl('ace/range').Range;

angular.module('thilenius.ace_editor', [])
  .directive('atAceEditor', [
    '$timeout',
    '$rootScope',
    'compiler',
    'aceSettings',
    function($timeout, $rootScope, compiler, aceSettings) {
      return {
        restrict: 'AE',
        templateUrl: 'app/directives/ace_editor/ace_editor.htm',
        link: function($scope, $element, $attr) {
          var editor = ace.edit($element[0]);
          editor.$blockScrolling = Infinity;
          // TODO(skycoop): Add file type detection
          editor.getSession().setMode('ace/mode/python');
          editor.getSession().setTabSize(2);
          // Manually set the editor's theme to a dark one. For some reson
          // setOptions gets defered and it causes the editor to flash white
          // before loading dark themes.
          editor.setTheme('ace/theme/monokai');
          editor.setOptions(aceSettings.values);
          $rootScope.$on('settings:update', (event, s) => {
            editor.setOptions(s);
          });
          // Bind the OT Doc to the editor
          var ctx = $scope.ephemeral.otDoc.createContext();
          var editorDoc = editor.getSession().getDocument();
          var suppress = false;
          var compileTimer = null;
          editorDoc.setNewLineMode('unix');
          editorDoc.setValue(ctx.get());
          editorDoc.on('change', (evnt) => {
            if (!suppress) {
              var pos = editorDoc.positionToIndex(evnt.start);
              switch (evnt.action) {
                case 'insert':
                  ctx.insert(pos, evnt.lines.join('\n'));
                  break;
                case 'remove':
                  ctx.remove(pos, evnt.lines.join('\n').length);
                  break;
                default:
                  throw new Error('unknown action: ' + evnt.action);
              }
              // Reset annotations and the compile timer
              if (compileTimer) {
                $timeout.cancel(compileTimer);
                editor.session.setAnnotations([]);
              }
              compileTimer = $timeout(() => {
                compiler.lintCurrentProject();
              }, 1000);
            }
          });
          ctx.onInsert = function(pos, text) {
            suppress = true;
            editorDoc.insert(editorDoc.indexToPosition(pos), text);
            suppress = false;
          };
          ctx.onRemove = function(pos, length) {
            suppress = true;
            var range = Range.fromPoints(editorDoc.indexToPosition(pos),
              editorDoc.indexToPosition(pos + length));
            editorDoc.remove(range);
            suppress = false;
          };

          // Watch for focus changes and focus now (on create)
          editor.on('focus', focus);
          focus(true);

          // Watch for compiler errors
          $rootScope.$watch(() => {
            return compiler.annotations;
          }, (newVal, oldVal) => {
            editor.session.setAnnotations(
              newVal[$scope.ephemeral.otDocId] || []);
          });
          editor.session.setAnnotations(
            compiler.annotations[$scope.ephemeral.otDocId] || []);

          var focus = function(focusEditor) {
            if (focusEditor) {
              editor.focus();
            }
          };
        }
      };
    }
  ]);
