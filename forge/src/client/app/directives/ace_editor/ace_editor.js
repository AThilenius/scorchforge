// Copyright 2015 Alec Thilenius
// All rights reserved.

// Override ACE base path
var requireImpl = ace.require != null ? ace.require : require;
ace.config.set('basePath', '/assets/ace');
var Range = requireImpl('ace/range').Range;

angular.module('thilenius.ace_editor', [])
  .directive('atAceEditor', [
    '$timeout', '$rootScope', 'compiler', 'aceSettings', 'otShare', 'data',
    function($timeout, $rootScope, compiler, aceSettings, otShare, data) {
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
          editor.setReadOnly(true);

          // Watch for cursor changes
          var existingMarkers = [];
          $rootScope.$watch(() => {
            return data.activeCursorTracker.remoteCurSels;
          }, (newVal, oldVal) => {
            if (!newVal || !newVal[$scope.path]) {
              return;
            }
            existingMarkers.forEach((marker) => {
              editor.session.removeMarker(marker);
            });
            existingMarkers = [];
            newVal[$scope.path].forEach((item) => {
              if (item.selection) {
                existingMarkers.push(editor.session.addMarker(item.selection,
                  'share-selection', 'text'));
              } else {
                existingMarkers.push(editor.session.addMarker(new Range(
                    item.cursor.row, item.cursor.column,
                    item.cursor.row, item.cursor.column + 1),
                  'share-cursor',
                  'text'));
              }
            });
          }, true);
          // Warch for changes to this users cursors and update state
          editor.selection.on('changeCursor', function() {
            data.activeCursorTracker.setState($scope.path,
              editor.selection.getCursor(),
              editor.selection.getSelectionAnchor(),
              editor.selection.getSelectionLead());
          });
          editor.selection.on('changeSelection', function() {
            data.activeCursorTracker.setState($scope.path,
              editor.selection.getCursor(),
              editor.selection.getSelectionAnchor(),
              editor.selection.getSelectionLead());
          });

          /**
           * Binds the Operation Transform Document to the current ACE window
           */
          var bindOtDoc = function(otDoc) {
            var ctx = otDoc.createContext();
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
                  compiler.lintProjectPython();
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
              var range = Range.fromPoints(editorDoc.indexToPosition(
                  pos),
                editorDoc.indexToPosition(pos + length));
              editorDoc.remove(range);
              suppress = false;
            };
          };

          // Subscribe the OT Doc
          var otDoc = otShare.ot.get('source_files', $scope.otDocId);
          otDoc.subscribe();
          otDoc.whenReady(() => {
            if (!otDoc.type) {
              otDoc.create('text');
            }
            if (otDoc.type && otDoc.type.name === 'text') {
              bindOtDoc(otDoc);
              editor.setReadOnly(false);
            } else {
              console.log('Failed to subscribe the ot doc!');
              otDoc.unsubscribe();
            }
          });

          // Watch for compiler errors
          $rootScope.$watch(() => {
            return compiler.annotations;
          }, (newVal, oldVal) => {
            editor.session.setAnnotations(
              newVal['/root/forge' + $scope.path] || []);
          });
          editor.session.setAnnotations(
            compiler.annotations['/root/forge' + $scope.path] || []);

          var focus = function(focusEditor) {
            if (focusEditor) {
              editor.focus();
            }
          };

          // Watch for focus changes and focus now (on create)
          editor.on('focus', focus);
          focus(true);
        }
      };
    }
  ]);
