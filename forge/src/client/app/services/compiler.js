// Copyright 2015 Alec Thilenius
// All rights reserved.

var app = angular.module('app');

/**
 * Lint command for Python projects
 */
var lintPythoCommand = function(path) {
  return `find '${path}' -name '*.py' -print0 | xargs -0 pylint ` +
    `--rcfile=\/root\/.pylintrc ` +
    `--reports no ` +
    `--msg-template='{path}:{line}:{column}: {category}: {msg}'\n`;
};

/**
 * Parses a single line of output from the python linter and returns an object
 * in the form { path, line, column, type, text } or null if nothing was parsed
 * from the line. This is the same format as what ACE expects.
 */
var parsePythonLint = function(line) {
  var regex =
    /^(\/root\/forge\/[^:]+\.py):(\d+):(\d+):\s(error|warning|convention):\s(.+)/;
  var matches = regex.exec(line);
  if (matches) {
    return {
      path: matches[1],
      row: parseInt(matches[2]) - 1,
      column: parseInt(matches[3]),
      // 'convention' => 'info' for ACE
      type: matches[4] === 'convention' ? 'info' : matches[4],
      text: matches[5].capitalizeFirstLetter()
    };
  } else {
    return null;
  }
};

/**
 * Manages all things to do with compilation (and linting) for source files
 */
app.service('compiler', [
  '$q', '$rootScope', 'billet', 'atRateLimiter',
  function($q, $rootScope, billet, atRateLimiter) {

    // otDocId to annotaion[ ]
    this.annotations = {};

    this.lintProjectPython = function(projectPath) {
      //billet.spawn((shell) => {
      //shell.execAndClose(lintPythoCommand(projectPath),
      //(stdOut, stdErr, exitCode) => {
      //// File path to annotation list
      //this.annotations = _.chain(stdOut.split('\n'))
      //// Reduce values into [{lintMessage, ephemeral},...]
      //.reduce((memo, line) => {
      //var lintMessage = parsePythonLint(line);
      //if (lintMessage) {
      //var ephemeral = sourceFiles.getEphemeralFromPath(
      //lintMessage.path);
      //if (ephemeral) {
      //lintMessage.otDocId = ephemeral.otDocId;
      //memo.push(lintMessage);
      //}
      //}
      //return memo;
      //}, [])
      //// Group by otDocId => { otDocId: [lintMessage], ... }
      //.groupBy((lintMessage) => {
      //return lintMessage.otDocId;
      //}).value();
      //});
      //});
    };

    //this.lintCurrentProject = function() {
    //this.lintProjectPython(
    //`/root/forge/${workspaces.active.name}/${projects.active.name}`);
    //};

    //// Lint newly opened porjects
    //$rootScope.$watch(() => {
    //return projects.active;
    //}, (newVal, oldVal) => {
    //if (newVal && workspaces.active) {
    //this.lintProjectPython(
    //`/root/forge/${workspaces.active.name}/${newVal.name}`);
    //}
    //});

  }
]);
