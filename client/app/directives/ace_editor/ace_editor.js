// Copyright 2015 Alec Thilenius
// All rights reserved.

// Override ACE base path
var ace = ace || {};
ace.config.set('basePath', '/assets/ace');

// Editor Interface:
//
// bool canEdit         (filename)
// void commitPending   (callback)
// void bindRepoForEdit (repo, relativePath)
// void bindRepoForView (repo, relativePath, changeList)
// void unload          ()
// void focus           ()
// void resize          ()
angular.module('thilenius.ace_editor', [])
    .directive('atAceEditor', [
      '$rootScope',
      '$timeout',
      function($rootScope, $timeout) {
        return {
          restrict: 'AE',
          templateUrl: 'app/directives/ace_editor/ace_editor.htm',
          link: function($scope, iElement, iAttrs) {
            // scope.editor = ace.edit('editor');
            // scope.editor.setTheme('ace/theme/twilight');
            // scope.editor.getSession().setMode('ace/mode/plain_text');
            // scope.editor.getSession().setTabSize(2);
            // scope.editor.$blockScrolling = Infinity;
            // scope.editor.setOptions({
            // enableBasicAutocompletion: true,
            // enableSnippets: true,
            // enableLiveAutocompletion: true
            //});
            // scope.editorVisible = false;
            // scope.activeRepo = null;
            // scope.relativePath = null;
            // scope.canRun = true;
            // scope.fileSessions = {};
            // scope.internalControl = scope.control || {};

            $scope.aceLoaded = function(editor){
              editor.$blockScrolling = Infinity;
              editor.setTabSize(2);
              editor.setUseSoftTabs(true);
            };

            // Maps file ends to ACE modes
            // scope.fileToAceMode = {
            //'cmakelists.txt': 'plain_text',
            //'.h': 'c_cpp',
            //'.cc': 'c_cpp',
            //'.py': 'python',
            //'.js': 'javascript'
            //};
            //// Used for view and run command switching
            // scope.fileToType = {
            //'cmakelists.txt': 'cpp',
            //'.h': 'cpp',
            //'.cc': 'cpp',
            //'.py': 'python',
            //'.js': 'javascript'
            //};
            // scope.activeType = null;
            //// Watch for setting changes
            //$rootScope.$watchCollection(
            //'editorSettings', function(settings, oldVal) {
            // if (settings) {
            // scope.editor.setOption("foldStyle", settings.foldStyle);
            // scope.editor.setOption("fontSize", settings.fontSize);
            // scope.editor.setOption(
            //"selectionStyle",
            // settings.fullLineSelection ? 'line' : 'text');
            // scope.editor.setOption("highlightActiveLine",
            // settings.highlightActiveLine);
            // scope.editor.setOption("highlightSelectedWord",
            // settings.highlightSelectedWord);
            // if (settings.keyBinding === 'ace') {
            // scope.editor.setKeyboardHandler("");
            //} else {
            // scope.editor.setKeyboardHandler("ace/keyboard/" +
            // settings.keyBinding);
            //}
            // scope.editor.setOption("scrollPastEnd",
            // settings.scrollPastEnd);
            // scope.editor.setOption("showGutter", settings.showGutter);
            // scope.editor.setOption("theme", settings.theme);
            // scope.editor.setOption("displayIndentGuides",
            // settings.displayIndentGuides);
            // scope.editor.setOption("showInvisibles",
            // settings.showInvisibles);
            // scope.editor.setOption("showPrintMargin",
            // settings.showPrintMargin);
            // scope.editor.setOption("fadeFoldWidgets",
            // settings.fadeFoldWidgets);
            //}
            //}, true);

            //// ===  Interface Implementation
            ///==================================
            // scope.internalControl.canEdit = function(filename) {
            // return scope.getValueFromFileEnding(scope.fileToType,
            // filename) !== null;
            //};

            // scope.internalControl.commitPending = function(callback) {
            // if (scope.activeRepo && !scope.editor.getReadOnly()) {
            //// Commit any pending code
            // scope.activeRepo.commit(scope.relativePath,
            // scope.editor.getValue(), callback);
            //}
            //};

            // scope.internalControl.resize = function() {
            // scope.editor.resize();
            //};

            // scope.internalControl.focus = function() { scope.editor.focus();
            // };

            //// repo: Repo: The repo instance
            //// relativePath string: The relative path as stored in the repo
            //// syncToClId string: The UUID for the CL to sync to or null for
            //// head
            //// readOnly bool: Set the editor to 'edit' or 'view' mode
            // scope.internalControl.bindFile = function(repo, relativePath,
            // syncToClId, readOnly) {
            // scope.lastStash = new Date();
            // scope.activeRepo = repo;
            // scope.activeType =
            // scope.getValueFromFileEnding(scope.fileToType, relativePath);
            // scope.relativePath = relativePath;
            //// Set mode based on file ending
            // var aceMode = scope.getValueFromFileEnding(scope.fileToAceMode,
            // relativePath) ||
            //'plain_text';
            // scope.editor.getSession().setMode('ace/mode/' + aceMode);
            // if (syncToClId) {
            // scope.editor.setValue(
            // repo.reconstructFilesForCL(syncToClId)[relativePath].source,
            // 1);
            //} else {
            //// Sync to head
            // scope.editor.setValue(repo.headState[relativePath].source, 1);
            //}
            // scope.editorVisible = true;
            // scope.restoreFileSession();
            // scope.editor.setReadOnly(readOnly);
            // scope.isReadOnly = readOnly;
            // if (!readOnly) {
            // scope.changeHandler = function(e) {
            // if (!scope.lastStash) {
            // scope.lastStash = new Date();
            //}
            //// Commit at max once every 60 seconds
            // if (new Date() - scope.lastStash >= 60000) {
            // scope.lastStash = new Date();
            // repo.commit(relativePath, scope.editor.getValue());
            //}
            //};
            // scope.editor.on(
            //"change", function(e) { scope.changeHandler(e); });
            //}
            //};

            // scope.internalControl.jumpTo = function(row, column) {
            //$timeout(function() {
            // scope.editor.scrollToLine(row, true, true, function() {});
            // scope.editor.gotoLine(row, column - 1, true);
            //});
            //};

            // scope.internalControl.unload = function() {
            // scope.changeHandler = function(e) {};
            // scope.saveFileSession();
            // if (scope.activeRepo && !scope.editor.getReadOnly()) {
            //// Commit any pending code
            // scope.activeRepo.commit(scope.relativePath,
            // scope.editor.getValue());
            //}
            // scope.activeRepo = null;
            // scope.relativePath = null;
            // scope.activeType = null;
            // scope.isLockedFile = false;
            //};

            //// Watch for billet begin-done for run flag
            //$rootScope.$on('billet.activeCord', function(event, cordStream) {
            // scope.canRun = false;
            // scope.$apply();
            // cordStream.onGrain(function(grain) {},
            // function() {
            // scope.canRun = true;
            // scope.$apply();
            //});
            //});

            //// Also check Billet directly for old/active cords
            // if (billet.currentCord && billet.isOldCordRunning) {
            // scope.canRun = false;
            // cordStream.onGrain(function(grain) {},
            // function() {
            // scope.canRun = true;
            // scope.$apply();
            //});
            //}

            //// private
            // scope.parseBilletAlerts = function() {
            // if (scope.relativePath) {
            // var activeAnotations = [];
            // for (var i = 0; scope.alerts && i < scope.alerts.length; i++) {
            // var alert = scope.alerts[i];
            // if (alert.file === scope.relativePath) {
            //// Need to decrement 1 from row and ACE 0 indexes rows
            // var newAlert = jQuery.extend({}, alert);
            // newAlert.row -= 1;
            // activeAnotations.push(newAlert);
            //}
            //}
            // scope.editor.session.setAnnotations(activeAnotations);
            //}
            //};

            //// Watch for billet alerts
            //$rootScope.$on('billet.alerts', function(event, alerts) {
            // scope.alerts = alerts;
            // scope.parseBilletAlerts();
            //});

            //// Also check Billet directly for old/active alerts
            // if (billet.currentAlerts) {
            // scope.alerts = billet.currentAlerts;
            // scope.parseBilletAlerts();
            //}

            //// private
            // scope.run = function() {
            // if (scope.activeRepo) {
            // scope.internalControl.commitPending(function() {
            //// Kick off the run based on file ending
            // var type = scope.getValueFromFileEnding(scope.fileToType,
            // scope.relativePath);
            // if (type === 'cpp') {
            // billet.runCMakeRepo(scope.activeRepo.repoProto.repo_header);
            //} else if (type === 'python') {
            // billet.runPythonFile(scope.activeRepo.repoProto.repo_header,
            // scope.relativePath);
            //} else {
            //// Error? I guess?
            //}
            //});
            //}
            //};

            //// private
            // scope.stop = function() {
            // if (scope.activeRepo) {
            // billet.terminateSession();
            //}
            //};

            //// private
            // scope.clean = function() {
            // if (scope.activeRepo) {
            // billet.clean(scope.activeRepo.repoProto.repo_header);
            //}
            //};

            //// private
            // scope.autoFormat = function() {
            // if (scope.activeRepo) {
            // if (scope.editor.getReadOnly()) {
            //// Don't format read only
            // return;
            //}
            // scope.saveFileSession();
            // scope.editor.setReadOnly(true);
            // billet.clangFormat(
            // scope.editor.getValue(),
            // function(newSource) {
            // scope.editor.setValue(newSource,
            // scope.editor.getCursorPosition());
            // scope.editor.setReadOnly(false);
            // scope.restoreFileSession();
            //},
            // function(err) { scope.editor.setReadOnly(false); });
            //}
            //};

            //// private
            // scope.getValueFromFileEnding = function(map, filename) {
            // for (var fileEnding in map) {
            // if (filename.toLowerCase().endsWith(fileEnding)) {
            // return map[fileEnding];
            //}
            //}
            // return null;
            //};

            //// private
            // scope.saveFileSession = function() {
            // if (!scope.activeRepo || !scope.relativePath) {
            // return;
            //}
            // var fileSessionKey =
            // scope.activeRepo.repoProto.repo_header.repo_uuid +
            // scope.relativePath;
            // scope.fileSessions[fileSessionKey] = {
            // vScroll: scope.editor.session.getScrollTop(),
            // hScroll: scope.editor.session.getScrollLeft(),
            // cursorRow: scope.editor.selection.getCursor().row,
            // cursorColumn: scope.editor.selection.getCursor().column,
            // undoHistory: scope.editor.getSession().getUndoManager()
            //};
            //};

            //// private
            // scope.restoreFileSession = function() {
            // scope.editor.focus();
            // if (!scope.activeRepo || !scope.relativePath) {
            // return;
            //}
            // var fileSessionKey =
            // scope.activeRepo.repoProto.repo_header.repo_uuid +
            // scope.relativePath;
            // var session = scope.fileSessions[fileSessionKey];
            // if (session) {
            // scope.editor.session.setScrollTop(session.vScroll);
            // scope.editor.session.setScrollLeft(session.hScroll);
            // scope.editor.selection.moveCursorToPosition(
            //{row: session.cursorRow, column: session.cursorColumn});
            // scope.editor.getSession().setUndoManager(session.undoHistory);
            //} else {
            //// Set defualts
            // scope.editor.getSession().setUndoManager(new ace.UndoManager());
            //}
            // scope.parseBilletAlerts();
            //};

            //// TODO(athilenius): Remove this
            //// private
            // scope.downloadRepoSnapshot = function() {
            // if (scope.activeRepo) {
            //// Force commit first
            // scope.internalControl.commitPending();
            //// Generate the zip
            // var zipBlob = scope.activeRepo.toZipFile();
            // var repoShortName =
            // scope.activeRepo.repoProto.repo_header.repo_name.split(
            //"/")[0];
            // var date = new Date();
            // var zipName = repoShortName + "-" +
            // date.getFullYear().toString().slice(-2) +
            //("0" + date.getDate()).slice(-2) +
            //("0" + (date.getMonth() + 1)).slice(-2) + '-' +
            //("0" + date.getHours()).slice(-2) + '-' +
            //("0" + date.getMinutes()).slice(-2) + '-' +
            //("0" + date.getSeconds()).slice(-2) + '.zip';
            //// Download it
            // saveAs(zipBlob, zipName);
            //}
            //};

          }
        };
      }
    ]);
