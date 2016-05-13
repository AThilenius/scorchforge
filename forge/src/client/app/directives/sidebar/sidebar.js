// Copyright 2015 Alec Thilenius
// All rights reserved.

angular.module('thilenius.sidebar', [])
  .directive('atSidebar', [
    '$rootScope', '$mdToast', '$mdDialog', 'FileSaver', 'Blob', 'Person',
    'data', 'compiler', 'atTextDialog', 'atShareDialog',
    function($rootScope, $mdToast, $mdDialog, FileSaver, Blob, Person, data,
      compiler, atTextDialog, atShareDialog) {
      return {
        restrict: 'AE',
        templateUrl: 'app/directives/sidebar/sidebar.htm',
        link: function($scope, iElement, iAttrs) {

          $scope.data = data;
          $scope.compiler = compiler;

          $scope.sidebarState = {};

          /**
           * Returns the error count (errors only) for a file given by otDocId
           */
          $scope.errorCount = function(item) {
            return _(compiler.annotations['/root/forge' + item.path])
              .filter((a) => {
                return a.type === 'error';
              })
              .length;
          };

          /**
           * Add a file to the given scope, by modal
           */
          var addFile = function($itemScope) {
            var parentPath = $itemScope.item ? $itemScope.item.path + '/' :
              '';
            var that = this;
            atTextDialog({
              title: 'File Name',
              content: 'New File Name',
              done: (val) => {
                if (!data.activeFileTree.addFile(parentPath + '/' +
                    val)) {
                  $mdToast.show($mdToast.simple()
                    .textContent(`File ${val} already exists!`)
                    .position('top right')
                    .hideDelay(3000)
                    .theme('error')
                  );
                } else {
                  $mdToast.show($mdToast.simple()
                    .textContent(`File ${val} created!`)
                    .position('top right')
                    .hideDelay(3000)
                    .theme('success')
                  );
                }
              }
            });
          };

          /**
           * Add a directory to the given scope, by modal
           */
          var addDirectory = function($itemScope) {
            var parentPath = $itemScope.item ? $itemScope.item.path + '/' :
              '';
            var that = this;
            atTextDialog({
              title: 'Directory Name',
              content: 'New Directory Name',
              done: (val) => {
                if (!data.activeFileTree.addDirectory(parentPath +
                    val)) {
                  $mdToast.show($mdToast.simple()
                    .textContent(
                      `Directory ${val} already exists!`)
                    .position('top right')
                    .hideDelay(3000)
                    .theme('error')
                  );
                } else {
                  $mdToast.show($mdToast.simple()
                    .textContent(`Directory ${val} created!`)
                    .position('top right')
                    .hideDelay(3000)
                    .theme('success')
                  );
                }
              }
            });
          };

          var renameItem = function($itemScope) {
            if (!$itemScope.item) {
              console.error('Missing Item Scope');
              return;
            }
            var endPath = $itemScope.item.path.split('/');
            var beginPath = endPath.splice(0, endPath.length - 1);
            var that = this;
            atTextDialog({
              title: 'Rename ' + $itemScope.item.name,
              content: 'New Name',
              placeholder: $itemScope.item.name,
              done: (val) => {
                if (!data.activeFileTree.moveItem($itemScope.item.path,
                    beginPath.join('/') + '/' + val)) {
                  $mdToast.show($mdToast.simple()
                    .textContent(
                      `An item named ${val} already exists!`)
                    .position('top right')
                    .hideDelay(3000)
                    .theme('error')
                  );
                }
              }
            });
          };

          var removeItem = function($itemScope) {
            if (!$itemScope.item) {
              console.error('Missing Item Scope');
              return;
            }
            var path = data.activeFileTree.sanitizePath($itemScope.item.path);
            var that = this;
            $mdDialog.show($mdDialog.confirm()
                .title('Are you sure?')
                .textContent(`Delete ${path.fullString}, are you sure?`)
                .ok('Delete')
                .cancel('Cancel'))
              .then(function() {
                if (!data.activeFileTree.removeItem(path.fullString)) {
                  $mdToast.show($mdToast.simple()
                    .textContent('Something didn\'t go well')
                    .position('top right')
                    .hideDelay(3000)
                    .theme('error')
                  );
                }
              });
          };

          var removeProject = function($itemScope) {
            console.error('Not Implemented');
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
            null, ['Delete', removeItem]
          ];

          $scope.directoryDropdown = [
            ['New Directory', addDirectory],
            ['New File', addFile],
            null, ['Rename', renameItem],
            ['Delete', removeItem]
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
            null, ['Rename', renameItem],
            ['Delete', removeItem]
          ];

          $scope.displayShareId = function() {
            $mdToast.show($mdToast.simple()
              .textContent(
                `Project ShareID: ${data.activeProject.id}`)
              .position('top right')
              .hideDelay(30000)
              .theme('success')
            );
          };

          $scope.downloadSnapshot = function() {
            // Generate the zip
            data.activeFileTree.snapshotFilesToZip((zipBlob) => {
              var date = new Date();
              var zipName = data.activeProject.name + '-' +
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
