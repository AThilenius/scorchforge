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
