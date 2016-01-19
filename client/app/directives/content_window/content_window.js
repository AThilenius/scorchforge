// Copyright 2015 Alec Thilenius
// All rights reserved.

// Interface:
//
// bool canEdit         (filename)
// void commitPending   (callback)
// void bindRepoForEdit (repo, relativePath)
// void bindRepoForView (repo, relativePath, changeList)
// void unload          ()

angular.module('thilenius.content_window', [
  'thilenius.console_window',
  'thilenius.ace_editor'
  //'thilenius.blockly_editor'
])
    .directive('atContentWindow', [
      '$rootScope',
      '$timeout',
      function($rootScope, $timeout) {
        return {
          restrict: 'AE',
          scope: {control: '='},
          templateUrl: 'app/directives/content_window/content_window.htm',
          link: function(scope, iElement, iAttrs) {
            //scope.activeRepo = null;
            //scope.relativePath = null;
            //scope.showConsole = false;
            //scope.consoleWindowControl = {};
            //scope.aceEditorControl = {};
            //scope.blocklyEditorControl = {};
            //scope.activeEditor = null;
            //scope.internalControl = scope.control || {};

            //// Watch for window refresh / close events
            //window.onbeforeunload = function() {
              //scope.internalControl.commitPending();
            //};

            //window.addEventListener("beforeunload", function(e) {
              //scope.internalControl.commitPending();
            //}, false);

            //scope.internalControl.commitPending = function(callback) {
              //if (scope.activeRepo) {
                //scope.activeEditor.commitPending(callback);
              //}
            //};

            //// Watch for changes to console size, so we can refresh the editor
            //// size
            //scope.$watch('showConsole', function(newVal, oldVal) {
              //if (scope.activeEditor) {
                //$timeout(function() { scope.activeEditor.resize(); }, 0);
                //if (!newVal) {
                  //scope.activeEditor.focus();
                //}
              //}
            //});

            //scope.internalControl.bindFile = function(repo, relativePath,
                                                      //syncToClId, readOnly) {
              //// TODO(athilenius): Check for locked files
              //if (scope.activeEditor) {
                //scope.activeEditor.unload();
              //}
              //scope.bindEditorForFile(relativePath);
              //scope.activeRepo = repo;
              //scope.relativePath = relativePath;
              //scope.activeEditor.bindFile(repo, relativePath, syncToClId,
                                          //readOnly);
            //};

            //scope.internalControl.jumpTo = function(row, column) {
              //if (scope.activeEditor && scope.activeEditor.jumpTo) {
                //scope.activeEditor.jumpTo(row, column);
              //}
            //};

            //// private
            //scope.bindEditorForFile = function(filename) {
              //if (scope.blocklyEditorControl.canEdit(filename)) {
                //scope.activeEditor = scope.blocklyEditorControl;
              //} else {
                //// Fallback to ACE and let it dispaly as text
                //scope.activeEditor = scope.aceEditorControl;
              //}
            //};

            //// private
            //scope.downloadRepoSnapshot = function() {
              //if (scope.activeRepo) {
                //// Force commit first
                //scope.activeEditor.commitPending();
                //// Generate the zip
                //var zipBlob = scope.activeRepo.toZipFile();
                //var repoShortName =
                    //scope.activeRepo.repoProto.repo_header.repo_name.split(
                        //"/")[0];
                //var date = new Date();
                //var zipName = repoShortName + "-" +
                              //date.getFullYear().toString().slice(-2) +
                              //("0" + date.getDate()).slice(-2) +
                              //("0" + (date.getMonth() + 1)).slice(-2) + '-' +
                              //("0" + date.getHours()).slice(-2) + '-' +
                              //("0" + date.getMinutes()).slice(-2) + '-' +
                              //("0" + date.getSeconds()).slice(-2) + '.zip';
                //// Download it
                //saveAs(zipBlob, zipName);
              //}
            //};

          }
        };
      }
    ]);
