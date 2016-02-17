// Copyright 2015 Alec Thilenius
// All rights reserved.

var Duplex = require('stream').Duplex;
var WebSocket = require('ws');
var _ = require('underscore');
var childProcess = require('child_process');
var sharejs = require('share');
//require('./node_modules/share/lib/types/json-api.js');

/**
 * Syncs a Person OT Doc, watching for changes to their Workspace or any child
 * items. Presents all of this as a map of items in the form:
 * { '/full/path/to/item', 'file contents if any'| null }
 *
 * @param {string} otDocId The OT Doc ID for the 'persons' model
 */
function WorkspaceSync(otDocId) {
  if (!(this instanceof exports.WorkspaceSync)) {
    return new exports.WorkspaceSync(otDocId);
  }
  // The file tree of all loaded items (Workspaces, Projects, and FT)
  this.fileTree = {};
  // Maps otDocId to the otDoc for a project.
  this.projectOtDocs_ = {};
  // Maps otDocId to the otDoc for a source file.
  this.sourceFileOtDocs_ = {};
  // Get the ip of the Docker host
  var hostIp = childProcess.execSync(
    '/sbin/ip route|awk \'/default/ { print $3  }\'').toString().trim('\n');
  var hostTarget = hostIp + ':' + process.env.FORGE_PORT;
  console.log('Connecting: ', hostTarget);
  var socket = new WebSocket('ws://' + hostTarget);
  this.sjs_ = new sharejs.client.Connection(socket);
  this.subscribePerson(otDocId);
};

WorkspaceSync.prototype.getDirectory = function(path) {
  var cursor = this.fileTree;
  path.split('/').forEach((part) => {
    if (part) {
      cursor = cursor[part];
      if (!cursor) {
        return null;
      }
    }
  });
  return _(cursor).keys();
};

WorkspaceSync.prototype.getItem = function(path) {
  var cursor = this.fileTree;
  path.split('/').forEach((part) => {
    if (part) {
      cursor = cursor[part];
      if (!cursor) {
        return null;
      }
    }
  });
  return cursor;
};

/**
 * Subscribes to, and watches for change on the 'persons' OT DOcument
 *
 * @param {string} otDocId The OT Doc ID for the PERSON document.
 */
WorkspaceSync.prototype.subscribePerson = function(otDocId) {
  // This never needs to be unsubscribed
  var otDoc = this.sjs_.get('persons', otDocId);
  otDoc.subscribe();
  otDoc.whenReady(() => {
    var doFn = () => {
      if (otDoc.type && otDoc.type.name === 'json0') {
        this.parseWorkspaces(otDoc.getSnapshot().workspaces.items);
      }
    };
    otDoc.on('op', doFn);
    doFn();
  });
};

WorkspaceSync.prototype.parseWorkspaces = function(workspaces) {
  workspaces.forEach((workspace) => {
    this.fileTree[workspace.name] = this.fileTree[workspace.name] || {};
    this.subscribeProject(workspace.name, workspace.projects.items);
  });
};

WorkspaceSync.prototype.subscribeProject = function(workspaceName, projects) {
  projects.forEach((project) => {
    this.fileTree[workspaceName][project.name] =
      this.fileTree[workspaceName][project.name] || {};
    // Load the project OT Doc if it's not in cache
    if (!this.projectOtDocs_[project.otDocId]) {
      var projectOtDoc = this.sjs_.get('projects', project.otDocId);
      projectOtDoc.subscribe();
      this.projectOtDocs_[project.otDocId] = projectOtDoc;
      projectOtDoc.whenReady(() => {
        var doFn = () => {
          if (projectOtDoc.type && projectOtDoc.type.name ===
            'json0') {
            this.subscribeFileTree(workspaceName, project.name,
              projectOtDoc.getSnapshot().fileTree);
          }
        };
        projectOtDoc.on('op', doFn);
        doFn();
      });
    }
  });
};

WorkspaceSync.prototype.subscribeFileTree = function(workspaceName, projectName,
  fileTree) {
  var subscribeRecursive = (item, parentObj) => {
    if (item.type === 'directory') {
      parentObj[item.name] = parentObj[item.name] || {};
      item.children.forEach((child) => {
        subscribeRecursive(child, parentObj[item.name]);
      });
    } else if (item.otDocId) {
      // Load the file OT Doc if it's not in cahce
      if (!this.sourceFileOtDocs_[item.otDocId]) {
        var fileOtDoc = this.sjs_.get('source_files', item.otDocId);
        fileOtDoc.subscribe();
        this.sourceFileOtDocs_[item.otDocId] = fileOtDoc;
        fileOtDoc.whenReady(() => {
          var doFn = () => {
            if (fileOtDoc.type && fileOtDoc.type.name === 'text') {
              parentObj[item.name] = {
                type: 'file',
                content: fileOtDoc.getSnapshot()
              };
            }
          };
          fileOtDoc.on('op', doFn);
          doFn();
        });
      }
    }
  };
  fileTree.forEach((item) => {
    subscribeRecursive(item, this.fileTree[workspaceName][projectName]);
  });
};

exports.WorkspaceSync = WorkspaceSync;
