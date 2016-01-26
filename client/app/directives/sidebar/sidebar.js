// Copyright 2015 Alec Thilenius
// All rights reserved.

angular.module('thilenius.sidebar', [])
  .directive('atSidebar', [
    '$rootScope',
    '$mdDialog',
    'Person',
    'Project',
    'SourceFile',
    'metastore',
    function($rootScope, $mdDialog, Person, Project, SourceFile, metastore) {
      return {
        restrict: 'AE',
        templateUrl: 'app/directives/sidebar/sidebar.htm',
        link: function($scope, iElement, iAttrs) {

          $scope.sidebarState = {};
          $scope.metastore = metastore;

          $scope.activateFile = function(file) {
            var ephemeral = metastore.ephemeral(file);
            ephemeral.readOnly = false;
            $scope.state.activeFile = file;
          };

          // Dropdown Handlers, Dropwdown Definitions
          var addProject = function($itemScope) {
            $scope.addProject();
          };

          var removeProject = function($itemScope) {
            $scope.removeProject($itemScope.project);
          };

          var addFile = function($itemScope) {
            $scope.addItemToProject(
              $itemScope.project,
              $itemScope.item ? $itemScope.item.children : null, {
                type: 'file'
              });
          };

          var addDirectory = function($itemScope) {
            $scope.addItemToProject(
              $itemScope.project,
              $itemScope.item ? $itemScope.item.children : null, {
                type: 'directory',
                isExpanded: true,
                children: []
              });
          };

          var renameItem = function($itemScope) {
            $scope.renameItemInProject($itemScope.project, $itemScope.item);
          };

          var removeItem = function($itemScope) {
            $scope.removeItemFromProject($itemScope.project, $itemScope.list,
              $itemScope.$index);
          };

          $scope.sidebarDropdown = [
            ['New Project', addProject]
          ];

          $scope.projectDropdown = [
            ['Delete', removeProject]
          ];

          $scope.activeProjectDropdown = [
            ['New Directory', addDirectory],
            ['New File', addFile],
            ['Recover Deleted File', function($itemScope) {}],
            null, ['Delete', removeProject]
          ];

          $scope.directoryDropdown = [
            ['New Directory', addDirectory],
            ['New File', addFile],
            null, ['Rename', renameItem],
            ['Delete', removeItem]
          ];

          $scope.fileDropdown = [
            ['View History', function($itemScope) {}],
            null, ['Rename', renameItem],
            ['Delete', removeItem]
          ];

        }
      };
    }
  ]);
