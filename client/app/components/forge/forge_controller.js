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

    /**
     * @param {string} project
     * @param {tjtowietj} metadata
     * @return {number}
     */
    $scope.mergeFilesAndFileMeta = function(project, metadata) {

    };

    $scope.misuse = function() {
      $scope.mergeFilesAndFileMeta($scope.mergeFilesAndFileMeta(42, 42), 42);
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
