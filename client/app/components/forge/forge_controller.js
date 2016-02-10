// Copyright 2015 Alec Thilenius
// All rights reserved.

var forgeApp = angular.module('app');

(function($) {
  $.event.special.destroyed = {
    remove: function(o) {
      if (o.handler) {
        o.handler();
      }
    }
  };
})(jQuery);

/**
 * This is the high level controller for the Forge editor. It holds most of the
 * editors state and data, like workspace, projects, and so on.
 */
forgeApp.controller('forgeController', [
  '$rootScope',
  '$scope',
  '$location',
  '$mdDialog',
  '$timeout',
  '$compile',
  'atTextDialog',
  'metastore',
  'Person',
  'Project',
  'Workspace',
  'SourceFile',
  'atRateLimiter',
  function($rootScope, $scope, $location, $mdDialog, $timeout, $compile,
    atTextDialog, metastore, Person, Project, Workspace, SourceFile,
    atRateLimiter) {
    $scope.forgeVersion = window.FORGE_VERSION;

    // TODO(athilenius): This is pretty fucking ugly and probably shouldn't be
    // here.
    var divDockManager = document.getElementById('my_dock_manager');
    var divTopBar = document.getElementById('topbar');
    $scope.dockManager = new dockspawn.DockManager(divDockManager);
    $scope.dockManager.initialize();
    // Let the dock manager element fill in the entire screen
    var onresized = function(e) {
      $scope.dockManager.resize(
        window.innerWidth,
        // The offsetHeight is from the topbar, the 4 is from the nav-h-bar
        window.innerHeight - (Math.max(divTopBar.offsetHeight, 28) + 4));
    };
    window.onresize = onresized;
    onresized(null);
    var project = new dockspawn.PanelContainer(document.getElementById(
      'projectWindow'), $scope.dockManager);
    var output = new dockspawn.PanelContainer(document.getElementById(
      'outputWindow'), $scope.dockManager);
    // Dock the panels on the dock manager
    $scope.documentNode = $scope.dockManager.context.model.documentManagerNode;
    $scope.projectNode = $scope.dockManager.dockLeft($scope.documentNode,
      project, 0.3);
    $scope.outputNode = $scope.dockManager.dockDown($scope.documentNode,
      output, 0.3);

    // These are just here to let me run shit in the Chrome dev console.
    // TODO(athilenius): Remove this
    window.Person = Person;
    window.Project = Project;
    window.Workspace = Workspace;
    window.SourceFile = SourceFile;
    window.rateLimiter = atRateLimiter;
    window.docManager = $scope.dockManager;

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
            metastore.linkHasMany($scope.workspace, projects,
              'Project');
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

    /**
     * Opens a source file, creting a new DockSpawn DockNode for it and docking
     * it directly to the parent container.
     */
    $scope.openFile = function(file) {
      // If the file is already open, bring it to front
      if (!file.links.ephemeral.dsData) {
        var dsData = {};
        dsData.domElement = angular.element(
          '<div class="fill" at-ace-editor file="file.links.meta"></div>'
        )[0];
        angular.element(document.getElementsByTagName('body')).append(
          dsData.domElement);
        $compile(dsData.domElement)({
          file: file.links.meta
        });
        dsData.panelContainer = new dockspawn.PanelContainer(dsData.domElement,
          $scope.dockManager);
        // Set panel attributes
        dsData.panelContainer.setTitle(file.links.meta.name);
        dsData.dockNode = $scope.dockManager.dockFill($scope.documentNode,
          dsData.panelContainer);
        file.links.ephemeral.dsData = dsData;
        dsData.panelContainer.onClose = function(container) {
          $timeout(function() {
            console.log('closing');
            file.links.ephemeral.dsData = undefined;
          });
        };
      }
    };

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
          .textContent('Delete the project \'' + project.name +
            '\'? This cannot be undone!')
          .ariaLabel('Delete Conformation')
          .ok('Delete Permanently')
          .cancel('Cancel'))
        .then(function() {
          // TODO(athilenius): Need to handle projects being marked 'archived'
          // not delete them.
          alert('Deprecated. Remove is being reworked.');
        });
    };

    $scope.addItemToProject = function(project, toChildList,
      itemMetaSeed) {
      atTextDialog({
        title: 'Name',
        content: 'New ' + itemMetaSeed.type.toUpperCase() +
          ' Name',
        done: function(val) {
          itemMetaSeed.name = val;
          if (itemMetaSeed.type === 'file') {
            Project.sourceFiles.create({
              id: project.id
            }, {}, function(file) {
              var itemMeta = metastore.linkMeta(project,
                file,
                itemMetaSeed);
              toChildList = toChildList || itemMeta.links.metaRoot;
              toChildList.unshift(itemMeta);
              metastore.saveMeta(itemMeta);
            });
          } else {
            var itemMeta = metastore.linkMeta(project,
              'SourceFile',
              itemMetaSeed);
            toChildList = toChildList || itemMeta.links.metaRoot;
            toChildList.unshift(itemMeta);
            metastore.saveMeta(itemMeta);
          }
        }
      });
    };

    $scope.renameItemInProject = function(project, obj) {
      atTextDialog({
        title: 'Rename',
        content: 'Rename \'' + obj.links.meta.name + '\'...',
        placeholder: obj.links.meta.name,
        done: function(val) {
          obj.links.meta.name = val;
          metastore.saveMeta(obj);
        }
      });
    };

    $scope.saveProject = function(project) {
      Project.prototype$updateAttributes({
        id: project.id
      }, project);
    };

    $scope.removeItemFromProject = function(project, fromChildList,
      index) {
      var item = fromChildList[index];
      var content = 'Are you sute you want to delete \'' + item.name +
        '\'?';
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
