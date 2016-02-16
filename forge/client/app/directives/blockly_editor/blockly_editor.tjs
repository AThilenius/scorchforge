// Copyright 2015 Alec Thilenius
// All rights reserved.

// Editor Interface:
//
// bool canEdit         (filename)
// void commitPending   (callback)
// void bindRepoForEdit (repo, relativePath)
// void bindRepoForView (repo, relativePath, changeList)
// void unload          ()
// void focus           ()
// void resize          ()
angular.module('thilenius.blockly_editor', [])
    .directive('atBlocklyEditor', [
      '$rootScope',
      '$timeout',
      function($rootScope, $timeout) {
        return {
          restrict: 'AE',
          scope: {control: '='},
          templateUrl: 'app/directives/blockly_editor/blockly_editor.htm',
          link: function(scope, iElement, iAttrs) {
            var blocklyXmlStartTag = '<BLOCKLY_XML_START>';
            var blocklyXmlEndTag = '<BLOCKLY_XML_END>';
            var pythonCommentBlock = '\"\"\"';
            scope.editorVisible = false;
            scope.activeRepo = null;
            scope.relativePath = null;
            scope.canRun = true;
            scope.readOnly = false;
            scope.changeHandler = function() {};
            scope.internalControl = scope.control || {};

            // ===  Interface Implementation  ==================================
            //scope.internalControl.canEdit = function(filename) {
              //return filename.toLowerCase().endsWith('.pyb');
            //};

            //scope.internalControl.commitPending = function(callback) {
              //if (scope.activeRepo) {
                //// Commit any pending code
                //scope.activeRepo.commit(scope.relativePath, scope.getCode(),
                                        //callback);
              //}
            //};

            //scope.internalControl.resize = function() {
              //Blockly.fireUiEvent(window, 'resize');
            //};

            //scope.internalControl.focus = function() {};

            //// repo: Repo: The repo instance
            //// relativePath string: The relative path as stored in the repo
            //// syncToClId string: The UUID for the CL to sync to or null for
            //// head
            //// readOnly bool: Set the editor to 'edit' or 'view' mode
            //scope.internalControl.bindFile = function(repo, relativePath,
                                                      //syncToClId, readOnly) {
              //// Blockly Setup
              //scope.workspace =
                  //Blockly.inject(document.getElementById('blocklyDiv'), {
                    //readOnly: readOnly,
                    //media: 'assets/blockly_media/',
                    //trashcan: true,
                    //toolbox: document.getElementById('toolbox')
                  //});
              //scope.workspace.addChangeListener(function() {
                //scope.changeHandler();
              //});
              //scope.lastStash = new Date();
              //scope.activeRepo = repo;
              //scope.relativePath = relativePath;
              //var code = null;
              //if (syncToClId) {
                //code =
                    //repo.reconstructFilesForCL(syncToClId)[relativePath].source;
              //} else {
                //// Sync to head
                //code = repo.headState[relativePath].source;
              //}
              //scope.workspace.clear();
              //scope.workspace.setVisible(true);
              //try {
                //var xml = scope.getXmlFromCode(code);
                //if (xml) {
                  //var xmlDom = Blockly.Xml.textToDom(xml);
                  //Blockly.Xml.domToWorkspace(scope.workspace, xmlDom);
                //}
              //} catch (e) {
                //console.log("Failed to load Blockly file!");
              //}
              //scope.readOnly = readOnly;
              //if (!readOnly) {
                //scope.changeHandler = function() {
                  //if (!scope.lastStash) {
                    //scope.lastStash = new Date();
                  //}
                  //// Commit at max once every 60 seconds
                  //if (new Date() - scope.lastStash >= 60000) {
                    //scope.lastStash = new Date();
                    //repo.commit(relativePath, scope.getCode());
                  //}
                //};
              //}
              //// Blockly can be a little sticky, force it to refresh
              //$timeout(function() {
                //Blockly.fireUiEvent(window, 'resize');
                //scope.workspace.render();
              //});
            //};

            //scope.internalControl.unload = function() {
              //scope.changeHandler = function() {};
              //if (scope.activeRepo && !scope.readOnly) {
                //// Commit any pending code
                //scope.activeRepo.commit(scope.relativePath, scope.getCode());
              //}
              //scope.activeRepo = null;
              //scope.relativePath = null;
              //scope.activeType = null;
              //scope.isLockedFile = false;
              //scope.workspace.setVisible(false);
            //};

            //// Watch for billet begin-done for run flag
            //$rootScope.$on('billet.activeCord', function(event, cordStream) {
              //scope.canRun = false;
              //scope.$apply();
              //cordStream.onGrain(function(grain) {},
                                 //function() {
                                   //scope.canRun = true;
                                   //scope.$apply();
                                 //});
            //});

            //// Also check Billet directly for old/active cords
            //if (billet.currentCord && billet.isOldCordRunning) {
              //scope.canRun = false;
              //cordStream.onGrain(function(grain) {},
                                 //function() {
                                   //scope.canRun = true;
                                   //scope.$apply();
                                 //});
            //}

            //// private
            //scope.run = function() {
              //if (scope.activeRepo) {
                //scope.internalControl.commitPending(function() {
                  //billet.runPythonFile(scope.activeRepo.repoProto.repo_header,
                                       //scope.relativePath);
                //});
              //}
            //};

            //// private
            //scope.stop = function() {
              //if (scope.activeRepo) {
                //billet.terminateSession();
              //}
            //};

            //// TODO(athilenius): Remove this
            //// private
            //scope.downloadRepoSnapshot = function() {
              //if (scope.activeRepo) {
                //// Force commit first
                //scope.internalControl.commitPending();
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

            //// private
            //scope.getCode = function() {
              //var pythonCode = Blockly.Python.workspaceToCode(scope.workspace);
              //var blocklyXmlObj = Blockly.Xml.workspaceToDom(scope.workspace);
              //var blocklyXmlStr = Blockly.Xml.domToText(blocklyXmlObj);
              //return pythonCode + '\n' + pythonCommentBlock + '\n' +
                     //blocklyXmlStartTag + blocklyXmlStr + blocklyXmlEndTag +
                     //'\n' + pythonCommentBlock;
            //};

            //// private
            //scope.getXmlFromCode = function(code) {
              //var startIndex = code.indexOf(blocklyXmlStartTag);
              //var endIndex = code.indexOf(blocklyXmlEndTag);
              //if (startIndex < 0 || endIndex < 0) {
                //return null;
              //}
              //return code.slice(startIndex + blocklyXmlStartTag.length,
                                //endIndex);
            //};

          }
        };
      }
    ]);
