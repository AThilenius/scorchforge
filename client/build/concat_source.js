// Copyright 2015 Alec Thilenius
// All rights reserved.
var app = angular.module('app', [
  'lbServices',
  'ngAnimate',
  'ngCookies',
  'ngMaterial',
  'dndLists',
  'ui.router',
  'ui.bootstrap.contextMenu',
  'ui.bootstrap',
  'xeditable',
  'thilenius.navbar',
  'thilenius.sidebar',
  'thilenius.content_window'
]);

app.run(function(editableOptions) { editableOptions.theme = 'bs3'; });

app.config([
  '$httpProvider',
  function($httpProvider) {
    $httpProvider.interceptors.push(function($q, $location, LoopBackAuth) {
      return {
        responseError: function(rejection) {
          if (rejection.status === 401) {
            // Now clearing the loopback values from client browser for safe
            // logout...
            LoopBackAuth.clearUser();
            LoopBackAuth.clearStorage();
            $location.nextAfterLogin = $location.path();
            $location.path('/login');
          }
          return $q.reject(rejection);
        }
      };
    });
  }
]);
;
// Copyright 2015 Alec Thilenius
// All rights reserved.
var app = angular.module('app');

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/components/login/login.html',
      controller: 'loginController'
    })
    .state('create_user', {
      url: '/create_user',
      templateUrl: 'app/components/create_user/create_user.html',
      controller: 'createUserController'
    })
    .state('forge', {
      url: '/forge',
      templateUrl: 'app/components/forge/forge.html',
      controller: 'forgeController'
    });
  $urlRouterProvider.otherwise('forge');
}]);
;
var app = angular.module('app');

app.controller('createUserController', [
  '$location',
  '$rootScope',
  '$scope',
  'Person',
  function($location, $rootScope, $scope, Person) {

    $scope.createAccount = function() {
      $scope.createCredentials.email =
          $scope.createCredentials.email.toLowerCase();
      Person.create($scope.createCredentials, function(result) {
        //$location.path('/club');
      }, function(error) {
        $scope.error = 'Woops, something isn\'t right';
      });
    };
  }
]);
;
var forgeApp = angular.module('app');

forgeApp.controller('forgeController', [
  '$rootScope',
  '$scope',
  '$location',
  '$mdDialog',
  'atTextDialog',
  'Person',
  'Project',
  'SourceFile',
  function($rootScope, $scope, $location, $mdDialog, atTextDialog, Person,
           Project, SourceFile) {
    $scope.forgeVersion = window.FORGE_VERSION;

    window.Person = Person;
    window.Project = Project;
    window.SourceFile = SourceFile;

    // Global state object (not intended for serialization)
    $scope.state = {
      viewingAsRole: 'student'
    };

    // Merges the files in project with it's directory metadata
    $scope.mergeFilesAndFileMeta  function(project, metadata) {

    };

    //$scope.person = Person.getCurrent(function(person) {
      //$scope.state.viewingAsRole = person.role;
      // Must wait till person is ready, need to create getModel() links
      //Person.projects(
          //{
            //id: Person.getCurrentId(),
            //filter: {include: {relation: 'sourceFiles'}}
          //},
          //function(projects) {
            //var linkProjectMeta = function(projectMeta) {
              //project = _(projects).findWhere({id: projectMeta.modelId});
              //projectMeta.getModel = function() { return project; };
              //// Link each file meta to it's model
              //var linkFileMetaRecursive = function(items) {
                //for (var i = 0; i < items.length; i++) {
                  //var item = items[i];
                  //if (item.children) {
                    //// Directory Meta
                    //linkFileMetaRecursive(item.children);
                  //} else {
                    //// File Meta
                    //var file =
                        //_(project.sourceFiles).findWhere({id: item.modelId});
                    //item.getModel = function() { return file; };
                  //}
                //}
              //};
              //linkFileMetaRecursive(project.metadata.fileTree);
            //};
            //// Link metatdata in Person.metadata.project with Project models
            //var project = null;
            //for (var i = 0; i < person.metadata.projects.length; i++) {
              //var projectMeta = person.metadata.projects[i];
              //linkProjectMeta(projectMeta);
            //}
            //$scope.projects = person.metadata.projects;
            //if (person.metadata.activeProject) {
              //linkProjectMeta(person.metadata.activeProject);
              //$scope.state.activeProject = person.metadata.activeProject;
            //}
          //});
    //});

    // Used by children to control project
    $scope.addProject = function() {
      atTextDialog({
        title: 'Project Name',
        content: 'New Project Name',
        done: function(val) {
          Person.projects.create({id: Person.getCurrentId()},
                                 {
                                   name: val,
                                   config: '',
                                 },
                                 function(project) {
                                   $scope.projects.unshift({
                                     modelId: project.id,
                                     getModel: function() { return project; }
                                   });
                                   Person.prototype$updateAttributes(
                                       {id: $scope.person.id}, $scope.person);
                                 });
        }
      });
    };

    $scope.removeProject = function(project) {
      $mdDialog.show($mdDialog.confirm()
                         .title('Delete, are you sure?')
                         .textContent('Delete the project \"' + project.name +
                                      '\"? This cannot be undone!')
                         .ariaLabel('Delete Conformation')
                         .ok('Delete Permanently')
                         .cancel('Cancel'))
          .then(function() {
            Project.deleteById({id: project.modelId});
            $scope.projects = _($scope.projects).without(project);
            Person.prototype$updateAttributes({id: $scope.person.id},
                                              $scope.person);
          });
    };

    $scope.addItemToProject = function(project, toChildList, itemMeta) {
      atTextDialog({
        title: 'Name',
        content: 'New ' + itemMeta.type.toUpperCase() + ' Name',
        done: function(val) {
          itemMeta.name = val;
          if (itemMeta.type === 'file') {
            Project.sourceFiles.create({id: project.id}, {}, function(file) {
              itemMeta.modelId = file.id;
              itemMeta.getModel = function() { return file; };
              toChildList.unshift(itemMeta);
              project.$save();
            });
          }
        }
      });
    };

    $scope.renameItemInProject = function(project, itemMeta) {
      atTextDialog({
        title: 'Rename',
        content: 'Rename \"' + itemMeta.name + '\"...',
        placeholder: itemMeta.name,
        done: function(val) {
          itemMeta.name = val;
          project.$save();
        }
      });
    };

    $scope.removeItemFromProject = function(project, fromChildList, index) {
      var item = fromChildList[index];
      var content = 'Are you sute you want to delete \"' + item.name + '\"?';
      var okay = 'Delete';
      if (item.type === 'directory' && item.children.length > 0) {
        content = 'Are you sute you want to delete ' + item.name +
                  ' and all items within it?';
        okay = 'Delete Directory and Subitems';
      }
      $mdDialog.show($mdDialog.confirm()
                         .title('Delete, are you sure?')
                         .textContent(content)
                         .ariaLabel('Delete Conformation')
                         .ok(okay)
                         .cancel('Cancel'))
          .then(function() {
            if (item.type === 'file') {
              // TODO(athilenius): Mark the file model deleted
            } else if (item.type === 'directory') {
              // TODO(athilenius): Mark all child files deleted
            }
            fromChildList.splice(index, 1);
            project.$save();
          });
    };

    //// Will redirect to login is failed
    // sentinel.tryLoadingFromCookie();

    //// Sentinel / Crucible
    //$scope.sentinel = sentinel;
    //$scope.crucible = crucible;
    //$scope.billet = billet;

    //// Sidebar
    //$scope.activeSidebarTab = 'file';

    //$scope.fileExplorerControl = {};
    //$scope.contentWindowControl = {};
    //$scope.historyExplorerControl = {};
    //$scope.anvilWindowControl = {};
    //$scope.settingsWindowControl = {};
    //$scope.alertWindowControl = {};

    //$scope.displayError = null;

    //$scope.buildHistory = function() {
    //$scope.contentWindowControl.commitPending();
    // if ($scope.fileExplorerControl.selected) {
    //$scope.historyExplorerControl.setRepoFile(
    //$scope.fileExplorerControl.selected.repo,
    //$scope.fileExplorerControl.selected.relativePath);
    //}
    //};

    //$scope.editOn = function() {
    // if ($scope.fileExplorerControl.selected) {
    //$scope.contentWindowControl.bindFile(
    //$scope.fileExplorerControl.selected.repo,
    //$scope.fileExplorerControl.selected.relativePath, null, false);
    //}
    //};

    //// Watch for alerts and set alert-eplorer active if there are any
    //$rootScope.$on('billet.alerts', function(event, alerts) {
    // if (alerts.length > 0) {
    //$scope.$apply(function() { $scope.activeSidebarTab = 'alerts'; });
    //}
    //});


    //$rootScope.$on('error', function(event, message) {
    //$scope.$apply(function() { $scope.displayError = message; });
    //});

    //$rootScope.$on('crucible.repoAdded', function(event, repo) {
    //$scope.fileExplorerControl.addRepo(repo);
    //});

    //$rootScope.$on(
    //'fileExplorer.fileSelected', function(event, repo, relativePath) {
    //$scope.contentWindowControl.bindFile(repo, relativePath, null, false);
    //$scope.contentWindowControl.billet = billet;
    //$scope.autoFormat = function() {
    //$scope.contentWindowControl.formatCode();
    //};
    //});

    //$rootScope.$on(
    //'historyExplorer.snapshotSelected', function(event, repo, relativePath,
    // changeList) {
    // if ($scope.activeSidebarTab === 'history') {
    //$scope.contentWindowControl.bindFile(
    // repo, relativePath, changeList.change_list_uuid, true);
    //}
    //});

    //$rootScope.$on('alertExplorer.jumpToAlert', function(event, alert) {
    //// Try to find the repo in crucible
    // for (var i = 0; crucible.repos && i < crucible.repos.length; i++) {
    // var repo = crucible.repos[i];
    // if (repo.repoProto.repo_header.repo_uuid === alert.repoUuid) {
    //// Found it
    //$scope.contentWindowControl.bindFile(repo, alert.file, null, false);
    //$scope.contentWindowControl.jumpTo(alert.row, alert.column);
    //}
    //}
    //});

    //$rootScope.$on(
    //'sentinel.logout', function(event) { crucible.unloadAllRepos(); });

    //// Load up Crucible and Billet (Should be logged in by the time we get
    /// here)
    // if (sentinel.token) {
    // crucible.loadAllRepos();
    // billet.init(sentinel.token);
    //}
  }
]);
;
// Copyright 2015 Alec Thilenius
// All rights reserved.

var app = angular.module('app');

app.controller('loginController', [
  '$location',
  '$rootScope',
  '$scope',
  'Person',
  function($location, $rootScope, $scope, Person) {

    $scope.login = function() {
      $scope.loginCredentials.email =
          $scope.loginCredentials.email.toLowerCase();
      Person.login($scope.loginCredentials, function(result) {
        $location.path('/forge');
      });
    };

  }
]);
;
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
angular.module('thilenius.ace_editor', [])
    .directive('atAceEditor', [
      '$rootScope',
      '$timeout',
      function($rootScope, $timeout) {
        return {
          restrict: 'AE',
          templateUrl: 'app/directives/ace_editor/ace_editor.htm',
          link: function(scope, iElement, iAttrs) {
            scope.editor = ace.edit("editor");
            scope.editor.setTheme("ace/theme/twilight");
            scope.editor.getSession().setMode("ace/mode/plain_text");
            scope.editor.getSession().setTabSize(2);
            scope.editor.$blockScrolling = Infinity;
            scope.editor.setOptions({
              enableBasicAutocompletion: true,
              enableSnippets: true,
              enableLiveAutocompletion: true
            });
            scope.editorVisible = false;
            scope.activeRepo = null;
            scope.relativePath = null;
            scope.canRun = true;
            scope.fileSessions = {};
            scope.internalControl = scope.control || {};
            // Maps file ends to ACE modes
            //scope.fileToAceMode = {
              //'cmakelists.txt': 'plain_text',
              //'.h': 'c_cpp',
              //'.cc': 'c_cpp',
              //'.py': 'python',
              //'.js': 'javascript'
            //};
            //// Used for view and run command switching
            //scope.fileToType = {
              //'cmakelists.txt': 'cpp',
              //'.h': 'cpp',
              //'.cc': 'cpp',
              //'.py': 'python',
              //'.js': 'javascript'
            //};
            //scope.activeType = null;
            //// Watch for setting changes
            //$rootScope.$watchCollection(
                //'editorSettings', function(settings, oldVal) {
                  //if (settings) {
                    //scope.editor.setOption("foldStyle", settings.foldStyle);
                    //scope.editor.setOption("fontSize", settings.fontSize);
                    //scope.editor.setOption(
                        //"selectionStyle",
                        //settings.fullLineSelection ? 'line' : 'text');
                    //scope.editor.setOption("highlightActiveLine",
                                           //settings.highlightActiveLine);
                    //scope.editor.setOption("highlightSelectedWord",
                                           //settings.highlightSelectedWord);
                    //if (settings.keyBinding === 'ace') {
                      //scope.editor.setKeyboardHandler("");
                    //} else {
                      //scope.editor.setKeyboardHandler("ace/keyboard/" +
                                                      //settings.keyBinding);
                    //}
                    //scope.editor.setOption("scrollPastEnd",
                                           //settings.scrollPastEnd);
                    //scope.editor.setOption("showGutter", settings.showGutter);
                    //scope.editor.setOption("theme", settings.theme);
                    //scope.editor.setOption("displayIndentGuides",
                                           //settings.displayIndentGuides);
                    //scope.editor.setOption("showInvisibles",
                                           //settings.showInvisibles);
                    //scope.editor.setOption("showPrintMargin",
                                           //settings.showPrintMargin);
                    //scope.editor.setOption("fadeFoldWidgets",
                                           //settings.fadeFoldWidgets);
                  //}
                //}, true);

            //// ===  Interface Implementation  ==================================
            //scope.internalControl.canEdit = function(filename) {
              //return scope.getValueFromFileEnding(scope.fileToType,
                                                  //filename) !== null;
            //};

            //scope.internalControl.commitPending = function(callback) {
              //if (scope.activeRepo && !scope.editor.getReadOnly()) {
                //// Commit any pending code
                //scope.activeRepo.commit(scope.relativePath,
                                        //scope.editor.getValue(), callback);
              //}
            //};

            //scope.internalControl.resize = function() {
              //scope.editor.resize();
            //};

            //scope.internalControl.focus = function() { scope.editor.focus(); };

            //// repo: Repo: The repo instance
            //// relativePath string: The relative path as stored in the repo
            //// syncToClId string: The UUID for the CL to sync to or null for
            //// head
            //// readOnly bool: Set the editor to 'edit' or 'view' mode
            //scope.internalControl.bindFile = function(repo, relativePath,
                                                      //syncToClId, readOnly) {
              //scope.lastStash = new Date();
              //scope.activeRepo = repo;
              //scope.activeType =
                  //scope.getValueFromFileEnding(scope.fileToType, relativePath);
              //scope.relativePath = relativePath;
              //// Set mode based on file ending
              //var aceMode = scope.getValueFromFileEnding(scope.fileToAceMode,
                                                         //relativePath) ||
                            //'plain_text';
              //scope.editor.getSession().setMode('ace/mode/' + aceMode);
              //if (syncToClId) {
                //scope.editor.setValue(
                    //repo.reconstructFilesForCL(syncToClId)[relativePath].source,
                    //1);
              //} else {
                //// Sync to head
                //scope.editor.setValue(repo.headState[relativePath].source, 1);
              //}
              //scope.editorVisible = true;
              //scope.restoreFileSession();
              //scope.editor.setReadOnly(readOnly);
              //scope.isReadOnly = readOnly;
              //if (!readOnly) {
                //scope.changeHandler = function(e) {
                  //if (!scope.lastStash) {
                    //scope.lastStash = new Date();
                  //}
                  //// Commit at max once every 60 seconds
                  //if (new Date() - scope.lastStash >= 60000) {
                    //scope.lastStash = new Date();
                    //repo.commit(relativePath, scope.editor.getValue());
                  //}
                //};
                //scope.editor.on(
                    //"change", function(e) { scope.changeHandler(e); });
              //}
            //};

            //scope.internalControl.jumpTo = function(row, column) {
              //$timeout(function() {
                //scope.editor.scrollToLine(row, true, true, function() {});
                //scope.editor.gotoLine(row, column - 1, true);
              //});
            //};

            //scope.internalControl.unload = function() {
              //scope.changeHandler = function(e) {};
              //scope.saveFileSession();
              //if (scope.activeRepo && !scope.editor.getReadOnly()) {
                //// Commit any pending code
                //scope.activeRepo.commit(scope.relativePath,
                                        //scope.editor.getValue());
              //}
              //scope.activeRepo = null;
              //scope.relativePath = null;
              //scope.activeType = null;
              //scope.isLockedFile = false;
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
            //scope.parseBilletAlerts = function() {
              //if (scope.relativePath) {
                //var activeAnotations = [];
                //for (var i = 0; scope.alerts && i < scope.alerts.length; i++) {
                  //var alert = scope.alerts[i];
                  //if (alert.file === scope.relativePath) {
                    //// Need to decrement 1 from row and ACE 0 indexes rows
                    //var newAlert = jQuery.extend({}, alert);
                    //newAlert.row -= 1;
                    //activeAnotations.push(newAlert);
                  //}
                //}
                //scope.editor.session.setAnnotations(activeAnotations);
              //}
            //};

            //// Watch for billet alerts
            //$rootScope.$on('billet.alerts', function(event, alerts) {
              //scope.alerts = alerts;
              //scope.parseBilletAlerts();
            //});

            //// Also check Billet directly for old/active alerts
            //if (billet.currentAlerts) {
              //scope.alerts = billet.currentAlerts;
              //scope.parseBilletAlerts();
            //}

            //// private
            //scope.run = function() {
              //if (scope.activeRepo) {
                //scope.internalControl.commitPending(function() {
                  //// Kick off the run based on file ending
                  //var type = scope.getValueFromFileEnding(scope.fileToType,
                                                          //scope.relativePath);
                  //if (type === 'cpp') {
                    //billet.runCMakeRepo(scope.activeRepo.repoProto.repo_header);
                  //} else if (type === 'python') {
                    //billet.runPythonFile(scope.activeRepo.repoProto.repo_header,
                                         //scope.relativePath);
                  //} else {
                    //// Error? I guess?
                  //}
                //});
              //}
            //};

            //// private
            //scope.stop = function() {
              //if (scope.activeRepo) {
                //billet.terminateSession();
              //}
            //};

            //// private
            //scope.clean = function() {
              //if (scope.activeRepo) {
                //billet.clean(scope.activeRepo.repoProto.repo_header);
              //}
            //};

            //// private
            //scope.autoFormat = function() {
              //if (scope.activeRepo) {
                //if (scope.editor.getReadOnly()) {
                  //// Don't format read only
                  //return;
                //}
                //scope.saveFileSession();
                //scope.editor.setReadOnly(true);
                //billet.clangFormat(
                    //scope.editor.getValue(),
                    //function(newSource) {
                      //scope.editor.setValue(newSource,
                                            //scope.editor.getCursorPosition());
                      //scope.editor.setReadOnly(false);
                      //scope.restoreFileSession();
                    //},
                    //function(err) { scope.editor.setReadOnly(false); });
              //}
            //};

            //// private
            //scope.getValueFromFileEnding = function(map, filename) {
              //for (var fileEnding in map) {
                //if (filename.toLowerCase().endsWith(fileEnding)) {
                  //return map[fileEnding];
                //}
              //}
              //return null;
            //};

            //// private
            //scope.saveFileSession = function() {
              //if (!scope.activeRepo || !scope.relativePath) {
                //return;
              //}
              //var fileSessionKey =
                  //scope.activeRepo.repoProto.repo_header.repo_uuid +
                  //scope.relativePath;
              //scope.fileSessions[fileSessionKey] = {
                //vScroll: scope.editor.session.getScrollTop(),
                //hScroll: scope.editor.session.getScrollLeft(),
                //cursorRow: scope.editor.selection.getCursor().row,
                //cursorColumn: scope.editor.selection.getCursor().column,
                //undoHistory: scope.editor.getSession().getUndoManager()
              //};
            //};

            //// private
            //scope.restoreFileSession = function() {
              //scope.editor.focus();
              //if (!scope.activeRepo || !scope.relativePath) {
                //return;
              //}
              //var fileSessionKey =
                  //scope.activeRepo.repoProto.repo_header.repo_uuid +
                  //scope.relativePath;
              //var session = scope.fileSessions[fileSessionKey];
              //if (session) {
                //scope.editor.session.setScrollTop(session.vScroll);
                //scope.editor.session.setScrollLeft(session.hScroll);
                //scope.editor.selection.moveCursorToPosition(
                    //{row: session.cursorRow, column: session.cursorColumn});
                //scope.editor.getSession().setUndoManager(session.undoHistory);
              //} else {
                //// Set defualts
                //scope.editor.getSession().setUndoManager(new ace.UndoManager());
              //}
              //scope.parseBilletAlerts();
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

          }
        };
      }
    ]);
;
// Copyright 2015 Alec Thilenius
// All rights reserved.

// Fires the events:
// alertsExplorer.snapshotSelected (repo, relativePath, changeList)
angular.module('thilenius.alerts_explorer', [])
    .directive('atAlertsExplorer', [
      '$rootScope',
      'billet',
      function($rootScope, billet) {
        return {
          restrict: 'AE',
          scope: {control: '='},
          templateUrl: 'app/directives/alerts_explorer/alerts_explorer.htm',
          link: function(scope, iElement, iAttrs) {
            scope.alerts = [];

            // Expose a control object
            scope.internalControl = scope.control || {};

            // Watch for billet alerts
            $rootScope.$on('billet.alerts', function(event, alerts) {
              scope.$apply(function() {
                scope.alerts = alerts;
              });
            });

            // Also check Billet directly for old/active alerts
            if (billet.currentAlerts) {
              scope.alerts = billet.currentAlerts;
            }

            scope.jumpToAlert = function(alert) {
              $rootScope.$broadcast('alertExplorer.jumpToAlert', alert);
            };

          }
        };
      }
    ]);
;
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
;
var importText = 'import scorch.anvil as anvil';

// ===  Spark Move  ============================================================
Blockly.Blocks.spark_move = {
  init: function() {
    this.appendDummyInput()
        .appendField("Move Spark")
        .appendField(new Blockly.FieldDropdown([
          ["Forward", "Forward"],
          ["Backward", "Backward"],
          ["Up", "Up"],
          ["Down", "Down"]
        ]),
                     "DIRECTION");
    this.setOutput(true, "Boolean");
    this.setColour(240);
    this.setTooltip('Moves a Spark, and checks if it was able to move.');
  }
};

Blockly.Python.spark_move = function(block) {
  var dropdown_direction = block.getFieldValue('DIRECTION');
  var code = 'anvil.move_spark(0, \"' + dropdown_direction + '\")';
  Blockly.Python.definitions_.import_anvil = importText;
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// ===  Spark Move No Return  ==================================================
Blockly.Blocks.spark_move_no_return = {
  init: function() {
    this.appendDummyInput()
        .appendField("Move Spark")
        .appendField(new Blockly.FieldDropdown([
          ["Forward", "Forward"],
          ["Backward", "Backward"],
          ["Up", "Up"],
          ["Down", "Down"]
        ]),
                     "DIRECTION");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(240);
    this.setTooltip('Moves a Spark, ignoring if it was able to do so.');
  }
};

Blockly.Python.spark_move_no_return = function(block) {
  var dropdown_direction = block.getFieldValue('DIRECTION');
  var code = 'anvil.move_spark(0, \"' + dropdown_direction + '\")\n';
  Blockly.Python.definitions_.import_anvil = importText;
  return code;
};

// ===  Spark Turn No Return  ==================================================
Blockly.Blocks.spark_turn_no_return = {
  init: function() {
    this.appendDummyInput()
        .appendField("Turn Spark")
        .appendField(
            new Blockly
                .FieldDropdown([["Left", "TurnLeft"], ["Right", "TurnRight"]]),
            "DIRECTION");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(240);
    this.setTooltip('Turns a Spark left or right 90 degrees.');
  }
};

Blockly.Python.spark_turn_no_return = function(block) {
  var dropdown_direction = block.getFieldValue('DIRECTION');
  var code = 'anvil.move_spark(0, \"' + dropdown_direction + '\")\n';
  Blockly.Python.definitions_.import_anvil = importText;
  return code;
};

// ===  Spark Mine =============================================================
Blockly.Blocks.spark_mine = {
  init: function() {
    this.appendDummyInput().appendField("Mine").appendField(
        new Blockly.FieldDropdown(
            [["Forward", "Forward"], ["Up", "Up"], ["Down", "Down"]]),
        "DIRECTION");
    this.setOutput(true, "Boolean");
    this.setColour(240);
    this.setTooltip(
        'Tells the Spark to mine, and checks if it was able to mine the block.');
  }
};

Blockly.Python.spark_mine = function(block) {
  var dropdown_direction = block.getFieldValue('DIRECTION');
  var code = 'anvil.mine_spark(0, \"' + dropdown_direction + '\")';
  Blockly.Python.definitions_.import_anvil = importText;
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// ===  Spark Mine No Return  ==================================================
Blockly.Blocks.spark_mine_no_return = {
  init: function() {
    this.appendDummyInput().appendField("Mine").appendField(
        new Blockly.FieldDropdown(
            [["Forward", "Forward"], ["Up", "Up"], ["Down", "Down"]]),
        "DIRECTION");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(240);
    this.setTooltip(
        'Tells the Spark to mine, but ignores if it was able to do so.');
  }
};

Blockly.Python.spark_mine_no_return = function(block) {
  var dropdown_direction = block.getFieldValue('DIRECTION');
  var code = 'anvil.mine_spark(0, \"' + dropdown_direction + '\")\n';
  Blockly.Python.definitions_.import_anvil = importText;
  return code;
};

// ===  Spark Drop Items  ======================================================
Blockly.Blocks.spark_drop_items = {
  init: function() {
    this.appendDummyInput().appendField("Drop All Items In Bag");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(240);
    this.setTooltip('Drops all items in the Spark\'s inventory infront of it.');
  }
};

Blockly.Python.spark_drop_items = function(block) {
  var code = 'anvil.drop_items_spark(0)\n';
  Blockly.Python.definitions_.import_anvil = importText;
  return code;
};

// ===  Spark Recall  ==========================================================
Blockly.Blocks.spark_recall = {
  init: function() {
    this.appendDummyInput().appendField("Teleport Back To Pad");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(240);
    this.setTooltip('Teleports the Spark back to it\'s pad.');
  }
};

Blockly.Python.spark_recall = function(block) {
  var code = 'anvil.recall_spark(0)\n';
  Blockly.Python.definitions_.import_anvil = importText;
  return code;
};
;
// Copyright 2015 Alec Thilenius
// All rights reserved.

angular.module('thilenius.console_window', [])
    .directive('atConsoleWindow', [
      '$sce',
      '$rootScope',
      '$timeout',
      function($sce, $rootScope, $timeout) {
        return {
          restrict: 'AE',
          scope: {control: '=', show: '='},
          templateUrl: 'app/directives/console_window/console_window.htm',
          link: function(scope, iElement, iAttrs) {
            scope.content = [];
            scope.show = false;
            scope.activeRegion = null;
            scope.internalControl = scope.control || {};

            // private
            scope.escapeCodes = {
              "[0m": "<span class='console-text' style='color: white;'>",
              "[31m": "<span class='console-text' style='color: #FF0000;'>",
              "[32m": "<span class='console-text' style='color: #00FF00;'>",
              "[33m": "<span class='console-text' style='color: yellow;'>",
              "[36m": "<span class='console-text' style='color: #00D8FF;'>"
            };

            // private
            //scope.scrollBottom = function() {
              //$('#consoleScroller')
                  //.animate({scrollTop: $('#consoleScroller')[0].scrollHeight},
                           //50);
            //};

            //// private
            //scope.readCordStream = function(cordStream) {
              //scope.content = [];
              //scope.writeLine('Streaming Fiber Cord: <a href="' +
                              //cordStream.fiberUrl + '" target="_blank">' +
                              //cordStream.fiberUrl + '</a>');
              //cordStream.onGrain(
                  //function(grains) {
                    //$timeout(function() {
                      //for (var i = 0; i < grains.length; i++) {
                        //scope.writeLine(grains[i].data);
                      //}
                      //scope.scrollBottom();
                    //});
                  //},
                  //function() {
                    //// End of cord
                  //});
            //};

            //// private
            //// TODO(athilenius): Do somethig with the channel
            //scope.writeLine = function(contentString) {
              //var lines = contentString.split('\n');
              //// Strip trailing \n
              //if (lines.length > 0 && lines[lines.length - 1] === '') {
                //lines = lines.slice(0, lines.length - 1);
              //}
              //for (var i = 0; i < lines.length; i++) {
                //// For example, if line is:
                //// green Hello blue world
                //// <span><pre>
                //// </pre></span><span gree><pre>Hello
                //// </pre></span><span blue><pre>world
                //// </pre></span>
                //// TODO(athilenius): sanatize oritinal text
                //var line = lines[i] === '' ? ' ' : lines[i];
                //// Check if it matches region regex
                //var regex = /^#region: (.*)/;
                //var matches = regex.exec(line);
                //if (matches) {
                  //scope.activeRegion = {
                    //name: matches[1],
                    //lines: 0
                  //};
                  //scope.content.push({toggleRegion: scope.activeRegion});
                  //continue;
                //}
                //regex = /^Process exited with code:\s+\d+/;
                //matches = regex.exec(line);
                //if (matches) {
                  //scope.activeRegion = null;
                //}
                //regex = /^#regionend/;
                //matches = regex.exec(line);
                //if (matches) {
                  //scope.activeRegion = null;
                  //continue;
                //}
                //if (scope.activeRegion) {
                  //scope.activeRegion.lines++;
                //}
                //for (var escapeCode in scope.escapeCodes) {
                  //var htmlCode = scope.escapeCodes[escapeCode];
                  //line = line.split(escapeCode).join("</span>" + htmlCode);
                //}
                //line = "<span class='console-text'>" + line + "</span>";
                //var html = $sce.trustAsHtml(line);
                //scope.content.push({region: scope.activeRegion, html: html});
              //}
            //};

            //$rootScope.$on('billet.oldCord', function(eventArgs, cordStream) {
              //// Stream old cord, but don't pop open the console
              //$timeout(function() { scope.readCordStream(cordStream); });
            //});

            //$rootScope.$on(
                //'billet.activeCord', function(eventArgs, cordStream) {
                  //// Stream cord, and open output
                  //scope.show = true;
                  //$timeout(function() { scope.readCordStream(cordStream); });
                //});

            //// Also check Billet directly for old/active cords
            //if (billet.currentCord) {
              //scope.readCordStream(billet.currentCord);
            //}


          }
        };
      }
    ]);
;
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
  'thilenius.ace_editor',
  'thilenius.blockly_editor'
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
;
// Copyright 2015 Alec Thilenius
// All rights reserved.

// Fires the events:
// historyExplorer.snapshotSelected (repo, relativePath, changeList)
angular.module('thilenius.history_explorer', [])
    .directive('atHistoryExplorer', [
      '$rootScope',
      function($rootScope) {
        return {
          restrict: 'AE',
          scope: {control: '='},
          templateUrl: 'app/directives/history_explorer/history_explorer.htm',
          link: function(scope, iElement, iAttrs) {
            scope.canRevert = false;
            scope.fileRelativePath = null;
            scope.hasSelection = false;
            scope.repoName = null;
            scope.selectedFile = null;
            scope.historyTree = {
              parents: []
            };

            // Expose a control object
            scope.internalControl = scope.control || {};

            // Watch for selections
            scope.$watch('historyTree.selected', function(newVal, oldVal) {
              if (newVal) {
                scope.canRevert =
                    newVal !== scope.historyTree.parents[0].children[0];
                $rootScope.$broadcast('historyExplorer.snapshotSelected',
                                      newVal.repo, newVal.relativePath,
                                      newVal.changeList);
              }
            });

            scope.revertToCl = function() {
              if (scope.selectedFile && scope.canRevert) {
                var repo = scope.historyTree.selected.repo;
                var changeList = scope.historyTree.selected.changeList;
                var newContent =
                    repo.reconstructFilesForCL(
                             changeList.change_list_uuid)[scope.selectedFile]
                        .source;
                scope.historyTree.selected.repo.commit(scope.selectedFile,
                                                       newContent);
                scope.internalControl.setRepoFile(repo, scope.selectedFile);
              }
            };

            // Should be called when a file is selected, renders out all CLs
            scope.internalControl.setRepoFile = function(repo, relativePath) {
              if (!repo || !relativePath) {
                scope.hasSelection = false;
                scope.repoName = null;
                scope.fileRelativePath = null;
                return;
              }
              // TODO(athilenius): Also observe preCommit hooks
              scope.hasSelection = true;
              var selectedRepoProto = repo.repoProto;
              var filteredChangeLists = scope.filterChangelistsAndReverse(
                  selectedRepoProto.change_lists, relativePath);
              scope.repoName = selectedRepoProto.repo_header.repo_name;
              scope.fileRelativePath = relativePath;
              // Compleatly rebuild the tree
              var newHistoryTree = {
                parents: []
              };
              // First organize it all into buckets by CL timestamp day - hour
              var hours = {};
              var hoursOrdered = [];
              for (var i = 0; i < filteredChangeLists.length; i++) {
                var changeList = filteredChangeLists[i];
                var dateObj = new Date(parseInt(changeList.timestamp));
                var dateTime = dateObj.toLocaleDateString() + " - " +
                               dateObj.getHours() + ":00";
                if (!hours[dateTime]) {
                  hours[dateTime] = [];
                  hoursOrdered.push(dateTime);
                }
                hours[dateTime].push(changeList);
              }
              // Add it all to the new tree
              for (var hoi = 0; hoi < hoursOrdered.length; hoi++) {
                var changeLists = hours[hoursOrdered[hoi]];
                var newParent = {
                  label: hoursOrdered[hoi],
                  children: []
                };
                for (var j = 0; j < changeLists.length; j++) {
                  var cl = changeLists[j];
                  newParent.children.push({
                    label:
                        (new Date(parseInt(cl.timestamp))).toLocaleTimeString(),
                    repo: repo,
                    relativePath: relativePath,
                    changeList: cl
                  });
                }
                newHistoryTree.parents.push(newParent);
              }
              if (newHistoryTree.parents.length > 0) {
                newHistoryTree.parents[0].expanded = true;
                if (newHistoryTree.parents[0].children.length > 0) {
                  newHistoryTree.selected =
                      newHistoryTree.parents[0].children[0];
                }
              }
              scope.historyTree = newHistoryTree;
              scope.canRevert = false;
              scope.selectedFile = relativePath;
            };

            // private
            scope.filterChangelistsAndReverse = function(changeLists,
                                                         relativePath) {
              var filteredChangeLists = [];
              for (var i = 0; i < changeLists.length; i++) {
                var changeList = changeLists[i];
                var hasFile = false;
                for (var j = 0; j < changeList.modified_files.length; j++) {
                  if (changeList.modified_files[j].file_info.relative_path ===
                      relativePath) {
                    hasFile = true;
                    break;
                  }
                }
                if (hasFile) {
                  filteredChangeLists.unshift(changeList);
                }
              }
              return filteredChangeLists;
            };

          }
        };
      }
    ]);
;
// Copyright 2015 Alec Thilenius
// All rights reserved.

angular.module('thilenius.navbar', [])
    .directive('atNavbar', [
      '$rootScope',
      '$location',
      'Person',
      function($rootScope, $location, Person) {
        return {
          templateUrl: 'app/directives/navbar/navbar.htm',
          link: function($scope, iElement, iAttrs) {

            $scope.logout = function() {
              Person.logout();
              $location.path('/login');
            };

          }
        };
      }
    ]);
;
// Copyright 2015 Alec Thilenius
// All rights reserved.

var SETTINGS_COOKIE_KEY = 'scorch_forge_settings';
// Fires the events:
// settings.changed  (settings object)
angular.module('thilenius.settings_window', [])
    .directive('atSettingsWindow', [
      '$sce',
      '$rootScope',
      '$cookies',
      function($sce, $rootScope, $cookies) {
        return {
          restrict : 'AE',
          scope : {control : '='},
          templateUrl : 'app/directives/settings_window/settings_window.htm',
          link : function(scope, iElement, iAttrs) {
            scope.defaultSettings = {
              foldStyle : "markbegin",
              fontSize : "12px",
              fullLineSelection : true,
              highlightActiveLine : true,
              highlightSelectedWord : true,
              keyBinding : "ace",
              scrollPastEnd : true,
              showGutter : true,
              theme : "ace/theme/twilight",
              displayIndentGuides : false,
              showInvisibles : false,
              showPrintMargin : true,
              fadeFoldWidgets : false
            };
            scope.settings = jQuery.extend({}, scope.defaultSettings);
            $rootScope.editorSettings = scope.settings;

            scope.resetSettings = function() {
              $rootScope.editorSettings = scope.settings =
                  jQuery.extend({}, scope.defaultSettings);
            };

            // Try loading cookies if we can
            var cookieSettingsJson = $cookies.get(SETTINGS_COOKIE_KEY);
            if (cookieSettingsJson) {
              var cookieSettingsObj = JSON.parse(cookieSettingsJson);
              scope.settings = jQuery.extend(scope.settings, cookieSettingsObj);
            }
            // Save to cookie on change
            $rootScope.$watchCollection(
                'editorSettings', function(newVal, oldVal) {
                  if (newVal) {
                    $cookies.put(SETTINGS_COOKIE_KEY,
                                 JSON.stringify(scope.settings));
                  }
                });
          }
        };
      }
    ]);
;
// Copyright 2015 Alec Thilenius
// All rights reserved.

angular.module('thilenius.sidebar', [])
    .directive('atSidebar', [
      '$rootScope',
      '$mdDialog',
      'atTextDialog',
      'Person',
      'Project',
      'SourceFile',
      function($rootScope, $mdDialog, atTextDialog, Person, Project,
               SourceFile) {
        return {
          restrict: 'AE',
          templateUrl: 'app/directives/sidebar/sidebar.htm',
          link: function($scope, iElement, iAttrs) {

            $scope.sidebarState = {};

            $scope.saveProject = function(project) {
              project.$save();
            };

            // Dropdown Handlers, Dropwdown Definitions
            var addProject = function($itemScope) { $scope.addProject(); };

            var removeProject = function($itemScope) {
              $scope.removeProject($itemScope.projectMeta);
            };

            var addFile = function($itemScope) {
              $scope.addItemToProject(
                  $itemScope.project,
                  $itemScope.item ?
                      $itemScope.item.children :
                      $itemScope.project.metadata.fileTree,
                  {type: 'file'});
            };

            var addDirectory = function($itemScope) {
              $scope.addItemToProject(
                  $itemScope.project,
                  $itemScope.item ?
                      $itemScope.item.children :
                      $itemScope.project.metadata.fileTree,
                  {type: 'directory', isExpanded: true, children: []});
            };

            var renameItem = function($itemScope) {
              $scope.renameItemInProject($itemScope.project,
                                         $itemScope.item);
            };

            var removeItem = function($itemScope) {
              $scope.removeItemFromProject($itemScope.project,
                                           $itemScope.list, $itemScope.$index);
            };

            $scope.sidebarDropdown = [['New Project', addProject]];

            $scope.projectDropdown = [['Delete', removeProject]];

            $scope.activeProjectDropdown = [
              ['New Directory', addDirectory],
              ['New File', addFile],
              ['Recover Deleted File', function($itemScope){}],
              null,
              ['Delete', removeProject]
            ];

            $scope.directoryDropdown = [
              ['New Directory', addDirectory],
              ['New File', addFile],
              null,
              ['Rename', renameItem],
              ['Delete', removeItem]
            ];

            $scope.fileDropdown = [
              ['View History', function($itemScope){}],
              null,
              ['Rename', renameItem],
              ['Delete', removeItem]
            ];

          }
        };
      }
    ]);
;
// Copyright 2015 Alec Thilenius
// All rights reserved.

var app = angular.module('app');

app.factory('atTextDialog', function($mdDialog) {
  return function(properties) {
    properties.ok = properties.ok || 'Okay';
    properties.cancel = properties.cancel || 'Cancel';
    properties.noBlank = properties.noBlank || true;
    return $mdDialog.show({
      controller: function($scope, $mdDialog) {
        $scope.properties = properties;
        $scope.model = properties.placeholder || '';
        if (properties.change) {
          $scope.$watch('model', function(oldval, newval) {
            properties.change($scope.model);
          });
        }
        $scope.cancel = function() { $mdDialog.cancel(); };
        $scope.okay = function() {
          if ($scope.properties.noBlank && isBlank($scope.model)) {
            $mdDialog.cancel();
          } else {
            $mdDialog.hide($scope.model);
            if ($scope.properties.done) {
              $scope.properties.done($scope.model);
            }
          }
        };
      },
      templateUrl: 'app/factories/text_dialog/text_dialog.htm',
      parent: angular.element(document.body),
      clickOutsideToClose: true
    });
  };
});
;
var app = angular.module('app');

app.service('meta', function() {
  var toMetaCache = {};
  var toModelCache = {};

  this.toMeta = function(model) {
    var meta = toMetaCache[model];
    if (!meta) {
      meta = {};
      toMetaCache[model] = meta;
      toModelCache[meta] = model;
    }
    return meta;
  };

  this.toModel = function(meta) {
    var model = toModelCache[meta];
    if (!model) {
      model = {};
      toModelCache[meta] = model;
      toMetaCache[model] = meta;
    }
    return model;
  };

  /**
   * @param {} a
   * @return {type}
   **/
  this.linkMeta = function(metaModel, metaObject, hasManyModel) {
    var protoKey = Object.getPrototypeOf(hasManyModel);
    hasManyModel.prototype.meta = function() {

    };
  };

});
;
/*
 * Various helpers for Javascript strings
 */

var isEmpty = function(str) {
  return str && str.length > 0;
};

var isBlank = function(str) {
  return !str || /^\s*$/.test(str);
};

String.prototype.toPascalCase = function() {
  return this.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
