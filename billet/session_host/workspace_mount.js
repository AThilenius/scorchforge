// Copyright 2015 Alec Thilenius
// All rights reserved.

var _ = require('underscore');
var childProcess = require('child_process');
var fuse = require('fuse-bindings');
var wss = require('./workspace_sync.js');

function WorkspaceMount(otDocId, mountPoint) {
  console.log('Mounting ', otDocId, ' to ', mountPoint);
  var workspaceSync = new wss.WorkspaceSync(otDocId);
  var nextFd = 1;

  // Create the directory
  childProcess.execSync('mkdir --parent ' + mountPoint);

  fuse.mount(mountPoint, {

    readdir: function(path, cb) {
      var items = workspaceSync.getDirectory(path);
      console.log('readdir(%s)', path, items);
      return cb(0, items);
      cb(0);
    },

    getattr: function(path, cb) {
      console.log('getattr(%s)', path);
      var item = workspaceSync.getItem(path);
      if (item && item.type === 'file') {
        cb(0, {
          mtime: new Date(),
          atime: new Date(),
          ctime: new Date(),
          size: item.content.length,
          mode: 33188,
          uid: process.getuid(),
          gid: process.getgid()
        });
      } else if (item) {
        // Assume everything else that isn't null is a directory
        cb(0, {
          mtime: new Date(),
          atime: new Date(),
          ctime: new Date(),
          size: 100,
          mode: 16877,
          uid: process.getuid(),
          gid: process.getgid()
        });
      } else {
        cb(fuse.ENOENT);
      }
    },

    open: function(path, flags, cb) {
      console.log('open(%s, %d)', path, flags);
      var item = workspaceSync.getItem(path);
      if (item && item.type === 'file') {
        cb(0, nextFd++);
      } else {
        cb(fuse.ENOENT);
      }
    },

    read: function(path, fd, buf, len, pos, cb) {
      console.log('read(%s, %d, %d, %d)', path, fd, len, pos);
      var item = workspaceSync.getItem(path);
      if (!item || !item.content) {
        return cb(0);
      }
      var str = item.content.substring(pos, pos + len);
      if (!str) {
        return cb(0);
      }
      buf.write(str);
      return cb(str.length);
    }
  });

  process.on('SIGINT', function() {
    fuse.unmount('./mnt', function() {
      process.exit();
    });
  });
}

exports.WorkspaceMount = WorkspaceMount;
