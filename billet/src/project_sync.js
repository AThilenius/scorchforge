// Copyright 2015 Alec Thilenius
// All rights reserved.

var FileTree = require('./file_tree.js').FileTree;
var _ = require('underscore');
var childProcess = require('child_process');
var ioClient = require('socket.io-client');
var sharejs = require('./scorch_share.js');

function ProjectSync(projectId) {
  if (!(this instanceof exports.ProjectSync)) {
    return new exports.ProjectSync(projectId);
  }

  this.fileTree_ = new FileTree();
  this.projectId_ = projectId;

  this.subscribeProject_(projectId);
};

ProjectSync.prototype.getDirectory = function(path) {
  var node = this.fileTree_.getNodeAtPath(path);
  if (!node || node.type !== 'directory') {
    return null;
  }
  return node;
};

ProjectSync.prototype.getItem = function(path) {
  return this.fileTree_.getNodeAtPath(path);
};

/**
 * Reads the contents of a file. This must be async as we aren't sure when
 * ShareJS will connect (could be in the future). Callback will be sent the
 * file's contents or null if it failed to load
 */
ProjectSync.prototype.readItem = function(path, callback) {
  var item = this.fileTree_.getNodeAtPath(path);
  if (!item || item.type !== 'file' || !item.otDocId) {
    return callback(null);
  }
  if (item.otDoc && item.otDocReady) {
    return callback(item.otDoc.getSnapshot() + '\n');
  } else {
    if (!item.otDoc) {
      // The doc hasn't been loaded yet (cold cache), load it and fire any
      // deffered callbacks once it's ready
      item.otDoc = sharejs.sjs.get('source_files', item.otDocId);
      item.otDoc.subscribe();
      item.otDoc.whenReady(() => {
        if (!item.otDoc.type) {
          item.otDoc.create('text');
        }
        if (item.otDoc.type && item.otDoc.type.name === 'text') {
          item.otDocReady = true;
          if (item.deferedCallbacks) {
            var contents = item.otDoc.getSnapshot();
            item.deferedCallbacks.forEach((deferedCallback) => {
              deferedCallback(contents + '\n');
            });
          }
        }
      });
    }
    // Loaded or not loaded, add the callback to the defered list
    item.deferedCallbacks = item.deferedCallbacks || [];
    item.deferedCallbacks.push(callback);
  }
};

/**
 * Uses Socket.IO to load existing diffs, watch for new diffs, and build a file
 * tree from that. Ot Docs are loaded on-demand (once the file contents are
 * requested)
 */
ProjectSync.prototype.subscribeProject_ = function(projectId) {
  // Watch for changes to the project Socket.io and add new diffs when they
  // come along
  var hostIp = childProcess.execSync(
    '/sbin/ip route|awk \'/default/ { print $3  }\'').toString().trim('\n');
  var hostTarget = 'http://' + hostIp + ':' + process.env.FORGE_PORT;
  console.log('Connecting Socket.io to ', hostTarget);
  var socket = ioClient.connect(hostTarget, {
    reconnect: true
  });
  socket.on('connect_error', (err) => {
    console.log('Socket.IO client connection error: ', err);
  });
  socket.on('error', (err) => {
    console.log('Socket.IO client error: ', err);
  });
  socket.on('connect', (socket) => {
    console.log('Connected to Forge Socket.io!');
  });
  socket.on('project-' + this.projectId_ + '-fileTree', (diffs) => {
    this.fileTree_.applyDiffs(diffs);
  });
  // Also lookup diffs now
  socket.emit('get-project-fileTree', {
    id: this.projectId_
  }, (err, diffs) => {
    this.fileTree_.applyDiffs(diffs);
  });

};

exports.ProjectSync = ProjectSync;
