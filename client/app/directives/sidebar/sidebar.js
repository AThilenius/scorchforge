// Copyright 2015 Alec Thilenius
// All rights reserved.

angular.module('thilenius.sidebar', [])
  .directive('atSidebar', [
    '$rootScope',
    'Person',
    'workspaces',
    'projects',
    function($rootScope, Person, workspaces, projects) {
      return {
        restrict: 'AE',
        templateUrl: 'app/directives/sidebar/sidebar.htm',
        link: function($scope, iElement, iAttrs) {

          // TODO(athilenius): File tree manipulation is NOT safe! Shit could
          // get fucked up if two people change things at the same time.

          // Watch active project and pull the file tree out of the OT Doc
          $scope.$watch('projects.active', () => {
            if (projects.active && projects.activeEphemeral) {
              projects.activeEphemeral.otDoc.promise.then((otDoc) => {
                $scope.fileTree = otDoc.getSnapshot().fileTree;
                // Also watch the doc for changes
                otDoc.on('op', () => {
                  $scope.fileTree = otDoc.getSnapshot().fileTree;
                });
              });
            }
          });

          $scope.remove = function(list, index) {
            // Copy it and remove Angular crap from the object (Yea it's gross)
            var oldTree = JSON.parse(angular.toJson($scope.fileTree));
            // Remove the item from local data now, then dump the OT Doc
            list.splice(index, 1);
            projects.activeEphemeral.otDoc.promise.then((otDoc) => {
              otDoc.submitOp({
                p: ['fileTree'],
                od: oldTree,
                oi: JSON.parse(angular.toJson($scope.fileTree))
              });
            });
          };

          $scope.sidebarState = {};
          $scope.workspaces = workspaces;
          $scope.projects = projects;

          var removeProject = function($itemScope) {
            $scope.removeProject($itemScope.project);
          };

          var addFile = function($itemScope) {
            projects.addFileFromModal($itemScope.item ?
              $itemScope.item.children : null);
          };

          var addDirectory = function($itemScope) {
            projects.addDirectoryFromModal(
              $itemScope.item ? $itemScope.item.children : null);
          };

          var renameItem = function($itemScope) {
            $scope.renameItemInProject($itemScope.project, $itemScope
              .item);
          };

          var removeItem = function($itemScope) {
            $scope.removeItemFromProject($itemScope.project,
              $itemScope.list,
              $itemScope.$index);
          };

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
