// Copyright 2015 Alec Thilenius
// All rights reserved.

angular.module('thilenius.sidebar', [])
  .directive('atSidebar', [
    '$rootScope',
    '$mdToast',
    'FileSaver',
    'Blob',
    'Person',
    'projects',
    'sourceFiles',
    'compiler',
    function($rootScope, $mdToast, FileSaver, Blob, Person, projects,
      sourceFiles, compiler) {
      return {
        restrict: 'AE',
        templateUrl: 'app/directives/sidebar/sidebar.htm',
        link: function($scope, iElement, iAttrs) {

          // TODO(athilenius): File tree manipulation is NOT safe! Shit could
          // get fucked up if two people change things at the same time.
          $scope.sourceFiles = sourceFiles;
          $scope.compiler = compiler;

          $scope.ephemeral = function(item) {
            if (item.otDocId) {
              return sourceFiles.getEphemeral(item.otDocId);
            }
          };

          $scope.sidebarState = {};
          $scope.projects = projects;

          /**
           * Returns the error count (errors only) for a file given by otDocId
           */
          $scope.errorCount = function(otDocId) {
            return _(compiler.annotations[otDocId])
              .filter((a) => {
                return a.type === 'error';
              })
              .length;
          };

          var removeProject = function($itemScope) {
            $scope.removeProject($itemScope.project);
          };

          var addFile = function($itemScope) {
            sourceFiles.addFileFromModal(
              $itemScope.item ? $itemScope.item.children : null);
          };

          var addDirectory = function($itemScope) {
            sourceFiles.addDirectoryFromModal(
              $itemScope.item ? $itemScope.item.children : null);
          };

          var renameItem = function($itemScope) {
            $scope.renameItemInProject($itemScope.project, $itemScope.item);
          };

          var removeItem = function($itemScope) {
            $scope.removeItemFromProject($itemScope.project, $itemScope.list,
              $itemScope.$index);
          };

          $scope.activeProjectDropdown = [
            ['New Directory', addDirectory],
            ['New File', addFile],
            [
              'Recover Deleted File',
              () => {},
              () => {
                // Disable
                return false;
              }
            ],
            null, [
              'Delete',
              () => {},
              () => {
                // Disable
                return false;
              }
            ]
          ];

          $scope.directoryDropdown = [
            ['New Directory', addDirectory],
            ['New File', addFile],
            null, [
              'Rename',
              () => {},
              () => {
                // Disable
                return false;
              }
            ],
            [
              'Delete',
              () => {},
              () => {
                // Disable
                return false;
              }
            ]
          ];

          $scope.fileDropdown = [
            [
              'View History',
              () => {},
              () => {
                // Disable
                return false;
              }
            ],
            null, [
              'Rename',
              () => {},
              () => {
                // Disable
                return false;
              }
            ],
            [
              'Delete',
              () => {},
              () => {
                // Disable
                return false;
              }
            ]
          ];

          $scope.displayShareId = function() {
            $mdToast.show($mdToast.simple()
              .textContent(
                `Project ShareID: ${projects.active.otDocId}`)
              .position('top right')
              .hideDelay(30000)
              .theme('success')
            );
          };

          $scope.downloadSnapshot = function() {
            // Generate the zip
            sourceFiles.snapshotFilesToZip((zipBlob) => {
              var date = new Date();
              var zipName = projects.active.name + '-' +
                ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
                ('0' + date.getDate()).slice(-2) + '-' +
                ('0' + date.getHours()).slice(-2) + '-' +
                ('0' + date.getMinutes()).slice(-2) + '-' +
                ('0' + date.getSeconds()).slice(-2) + '.zip';
              // Download it
              FileSaver.saveAs(zipBlob, zipName);
            });
          };

        }
      };
    }
  ]);
