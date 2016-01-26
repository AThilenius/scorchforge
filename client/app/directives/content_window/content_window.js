// Copyright 2015 Alec Thilenius
// All rights reserved.

/**
 * At a high level, this controller watches changes to a file and choses when to
 * stash commits, and when to clush the stashed commits to the commit log. It
 * also handles edge cases like when the window closes.
 */
angular.module('thilenius.content_window', [
    'thilenius.console_window',
    'thilenius.ace_editor'
  ])
  .directive('atContentWindow', [
    '$timeout',
    function($timeout) {
      return {
        restrict: 'AE',
        templateUrl: 'app/directives/content_window/content_window.htm',
        link: function($scope, iElement, iAttrs) {
          // Note that Ephemeral data can have: {
          //   textBuffer:string,
          //   readOnly:Boolean
          // }

          window.addEventListener('beforeunload', function(e) {}, false);

        }
      };
    }
  ]);
