// Copyright 2015 Alec Thilenius
// All rights reserved.

// Fires the events:
// alertsExplorer.snapshotSelected (repo, relativePath, changeList)
angular.module('thilenius.alerts_explorer', [])
    .directive('atAlertsExplorer', [
        '$rootScope',
        'billet',
        function ($rootScope, billet) {
            return {
                restrict: 'AE',
                scope: {control: '='},
                templateUrl: 'app/directives/alerts_explorer/alerts_explorer.htm',
                link: function (scope, iElement, iAttrs) {
                    scope.alerts = [];

                    // Expose a control object
                    scope.internalControl = scope.control || {};

                    // Watch for billet alerts
                    $rootScope.$on('billet.alerts', function (event, alerts) {
                        scope.$apply(function () {
                            scope.alerts = alerts;
                        });
                    });

                    // Also check Billet directly for old/active alerts
                    if (billet.currentAlerts) {
                        scope.alerts = billet.currentAlerts;
                    }

                    scope.jumpToAlert = function (alert) {
                        $rootScope.$broadcast('alertExplorer.jumpToAlert', alert);
                    };

                }
            };
        }
    ]);
