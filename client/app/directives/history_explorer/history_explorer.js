// Copyright 2015 Alec Thilenius
// All rights reserved.

// Fires the events:
// historyExplorer.snapshotSelected (repo, relativePath, changeList)
angular.module('thilenius.history_explorer', [])
    .directive('atHistoryExplorer', [
        '$rootScope',
        function ($rootScope) {
            return {
                restrict: 'AE',
                scope: {control: '='},
                templateUrl: 'app/directives/history_explorer/history_explorer.htm',
                link: function (scope, iElement, iAttrs) {
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
                    scope.$watch('historyTree.selected', function (newVal, oldVal) {
                        if (newVal) {
                            scope.canRevert =
                                newVal !== scope.historyTree.parents[0].children[0];
                            $rootScope.$broadcast('historyExplorer.snapshotSelected',
                                newVal.repo, newVal.relativePath,
                                newVal.changeList);
                        }
                    });

                    scope.revertToCl = function () {
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
                    scope.internalControl.setRepoFile = function (repo, relativePath) {
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
                                    label: (new Date(parseInt(cl.timestamp))).toLocaleTimeString(),
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
                    scope.filterChangelistsAndReverse = function (changeLists,
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
