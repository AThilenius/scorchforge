// Copyright 2015 Alec Thilenius
// All rights reserved.

angular.module('thilenius.console_window', [])
    .directive('atConsoleWindow', [
        '$sce',
        '$rootScope',
        '$timeout',
        function ($sce, $rootScope, $timeout) {
            return {
                restrict: 'AE',
                scope: {control: '=', show: '='},
                templateUrl: 'app/directives/console_window/console_window.htm',
                link: function (scope, iElement, iAttrs) {
                    scope.content = [];
                    scope.show = false;
                    scope.activeRegion = null;
                    scope.internalControl = scope.control || {};

                    // private
                    scope.escapeCodes = {
                        "[0m": "<span class='console-text' style='color: white;'>",
                        "[31m": "<span class='console-text' style='color: #FF0000;'>",
                        "[32m": "<span class='console-text' style='color: #00FF00;'>",
                        "[33m": "<span class='console-text' style='color: yellow;'>",
                        "[36m": "<span class='console-text' style='color: #00D8FF;'>"
                    };

                    // private
                    //scope.scrollBottom = function() {
                    //$('#consoleScroller')
                    //.animate({scrollTop: $('#consoleScroller')[0].scrollHeight},
                    //50);
                    //};

                    //// private
                    //scope.readCordStream = function(cordStream) {
                    //scope.content = [];
                    //scope.writeLine('Streaming Fiber Cord: <a href="' +
                    //cordStream.fiberUrl + '" target="_blank">' +
                    //cordStream.fiberUrl + '</a>');
                    //cordStream.onGrain(
                    //function(grains) {
                    //$timeout(function() {
                    //for (var i = 0; i < grains.length; i++) {
                    //scope.writeLine(grains[i].data);
                    //}
                    //scope.scrollBottom();
                    //});
                    //},
                    //function() {
                    //// End of cord
                    //});
                    //};

                    //// private
                    //// TODO(athilenius): Do somethig with the channel
                    //scope.writeLine = function(contentString) {
                    //var lines = contentString.split('\n');
                    //// Strip trailing \n
                    //if (lines.length > 0 && lines[lines.length - 1] === '') {
                    //lines = lines.slice(0, lines.length - 1);
                    //}
                    //for (var i = 0; i < lines.length; i++) {
                    //// For example, if line is:
                    //// green Hello blue world
                    //// <span><pre>
                    //// </pre></span><span gree><pre>Hello
                    //// </pre></span><span blue><pre>world
                    //// </pre></span>
                    //// TODO(athilenius): sanatize oritinal text
                    //var line = lines[i] === '' ? ' ' : lines[i];
                    //// Check if it matches region regex
                    //var regex = /^#region: (.*)/;
                    //var matches = regex.exec(line);
                    //if (matches) {
                    //scope.activeRegion = {
                    //name: matches[1],
                    //lines: 0
                    //};
                    //scope.content.push({toggleRegion: scope.activeRegion});
                    //continue;
                    //}
                    //regex = /^Process exited with code:\s+\d+/;
                    //matches = regex.exec(line);
                    //if (matches) {
                    //scope.activeRegion = null;
                    //}
                    //regex = /^#regionend/;
                    //matches = regex.exec(line);
                    //if (matches) {
                    //scope.activeRegion = null;
                    //continue;
                    //}
                    //if (scope.activeRegion) {
                    //scope.activeRegion.lines++;
                    //}
                    //for (var escapeCode in scope.escapeCodes) {
                    //var htmlCode = scope.escapeCodes[escapeCode];
                    //line = line.split(escapeCode).join("</span>" + htmlCode);
                    //}
                    //line = "<span class='console-text'>" + line + "</span>";
                    //var html = $sce.trustAsHtml(line);
                    //scope.content.push({region: scope.activeRegion, html: html});
                    //}
                    //};

                    //$rootScope.$on('billet.oldCord', function(eventArgs, cordStream) {
                    //// Stream old cord, but don't pop open the console
                    //$timeout(function() { scope.readCordStream(cordStream); });
                    //});

                    //$rootScope.$on(
                    //'billet.activeCord', function(eventArgs, cordStream) {
                    //// Stream cord, and open output
                    //scope.show = true;
                    //$timeout(function() { scope.readCordStream(cordStream); });
                    //});

                    //// Also check Billet directly for old/active cords
                    //if (billet.currentCord) {
                    //scope.readCordStream(billet.currentCord);
                    //}


                }
            };
        }
    ]);
