// Copyright 2015 Alec Thilenius
// All rights reserved.

var FileTree = require('./file_tree.js').FileTree;
var _ = require('underscore');
var scorchSocket = require('./scorch_socket.js');
var sharejs = require('./scorch_share.js');

function ProjectSync(projectId) {
  if (!(this instanceof exports.ProjectSync)) {
    return new exports.ProjectSync(projectId);
  }

  this.fileTree_ = new FileTree();
  this.projectId_ = projectId;

  this.subscribeProject_(projectId);
};

ProjectSync.prototype.release = function() {
  scorchSocket.socket.removeAllListeners('project-' + this.projectId_ +
    '-fileTree');
};

/**
 * Uses Socket.IO to load existing diffs, watch for new diffs, and build a file
 * tree from that. Ot Docs are loaded on-demand (once the file contents are
 * requested)
 */
ProjectSync.prototype.subscribeProject_ = function(projectId) {
  // Watch for changes to the project Socket.io and add new diffs when they
  // come along
  scorchSocket.socket.on('project-' + this.projectId_ + '-fileTree',
    (diffs) => {
      this.fileTree_.applyDiffs(diffs);
    });
  // Also lookup diffs now
  scorchSocket.socket.emit('get-project-fileTree', {
    id: this.projectId_
  }, (err, diffs) => {
    this.fileTree_.applyDiffs(diffs);
  });

};

exports.ProjectSync = ProjectSync;
