// Copyright 2015 Alec Thilenius
// All rights reserved.

var forgeApp = angular.module('app');

/**
 * This is the high level controller for the Forge editor. It holds most of the
 * editors state and data, like workspace, projects, and so on.
 */
forgeApp.controller('forgeController', [
  '$rootScope',
  '$scope',
  '$location',
  '$mdDialog',
  'atTextDialog',
  'metastore',
  'Person',
  'Project',
  'Workspace',
  'SourceFile',
  function($rootScope, $scope, $location, $mdDialog, atTextDialog,
    metastore, Person, Project, Workspace, SourceFile) {
    $scope.forgeVersion = window.FORGE_VERSION;

    // These are just here to let me run shit in the Chrome dev console.
    // TODO(athilenius): Remove this
    window.Person = Person;
    window.Project = Project;
    window.Workspace = Workspace;
    window.SourceFile = SourceFile;

    // Global state object (not intended for serialization)
    $scope.state = {
      viewingAsRole: 'student'
    };

    $scope.person = Person.getCurrent(function(person) {
      $scope.state.viewingAsRole = person.role;
    });

    // TODO(athilenius): Find some way to make this less fucking ugly. I can't
    // use the nice Loopback Include feature because it doesn't instantiate
    // instances of the actual model prototype like I need.
    $scope.workspace = Person.workspaces({
        id: Person.getCurrentId()
      })
      .$promise.then(function(workspaces) {
        $scope.workspace = workspaces[0];
        // Load projects for workspace
        Workspace.projects({
            id: $scope.workspace.id
          })
          .$promise.then(function(projects) {
            $scope.workspace.projects = $scope.projects = projects;
            // Initialize workspace metadata
            metastore.linkHasMany($scope.workspace, projects, 'Project');
            // Load source files for each project
            _(projects).each(function(project) {
              Project.sourceFiles({
                id: project.id
              }).$promise.then(function(sourceFiles) {
                project.sourceFiles = sourceFiles;
                // Initialize metadata for sourceFiles
                metastore.linkHasMany(project, sourceFiles,
                  'SourceFile');
              });
            });
          });
      });

    // Used by children to control project
    $scope.addProject = function() {
      atTextDialog({
        title: 'Project Name',
        content: 'New Project Name',
        done: function(val) {
          Workspace.projects.create({
              id: $scope.workspace.id
            }, {
              name: val,
              config: '',
            },
            function(project) {
              metastore.linkMeta($scope.workspace, project);
              $scope.workspace.projects.unshift(project);
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
          // TODO(athilenius): Need to handle projects being marked 'archived'
          // not delete them.
          alert('Deprecated. Remove is being reworked.');
        });
    };

    $scope.addItemToProject = function(project, toChildList, itemMetaSeed) {
      atTextDialog({
        title: 'Name',
        content: 'New ' + itemMetaSeed.type.toUpperCase() + ' Name',
        done: function(val) {
          itemMetaSeed.name = val;
          if (itemMetaSeed.type === 'file') {
            Project.sourceFiles.create({
              id: project.id
            }, {}, function(file) {
              var itemMeta = metastore.linkMeta(project, file,
                itemMetaSeed);
              toChildList = toChildList || metastore.metaRoot(
                itemMeta);
              toChildList.unshift(itemMeta);
              metastore.saveMeta(itemMeta);
            });
          } else {
            var itemMeta = metastore.linkMeta(project, 'SourceFile',
              itemMetaSeed);
            toChildList = toChildList || metastore.metaRoot(
              itemMeta);
            toChildList.unshift(itemMeta);
            metastore.saveMeta(itemMeta);
          }
        }
      });
    };

    $scope.renameItemInProject = function(project, obj) {
      var itemMeta = metastore.meta(obj);
      atTextDialog({
        title: 'Rename',
        content: 'Rename \"' + itemMeta.name + '\"...',
        placeholder: itemMeta.name,
        done: function(val) {
          itemMeta.name = val;
          metastore.saveMeta(obj);
        }
      });
    };

    $scope.saveProject = function(project) {
      Project.prototype$updateAttributes({
        id: project.id
      }, project);
    };

    $scope.removeItemFromProject = function(project, fromChildList, index) {
      var item = fromChildList[index];
      var content = 'Are you sute you want to delete \"' + item.name +
        '\"?';
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
          // TODO(athilenius): Need to handle files being marked 'archived' or
          // 'hidden' not delete them.
          alert('Deprecated. Remove is being reworked.');
        });
    };
  }
]);
