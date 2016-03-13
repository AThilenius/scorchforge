// Copyright 2015 Alec Thilenius
// All rights reserved.

var _ = require('underscore');
var childProcess = require('child_process');
var fuse = require('fuse-bindings');
var pss = require('./project_sync.js');

function ProjectMount(projectId, mountPoint) {
  this.mountPoint_ = mountPoint;

  console.log('Mounting project ', projectId, ' to ', mountPoint);
  var projectSync = new pss.ProjectSync(projectId);
  var nextFd = 1;

  // Create the directory if needed
  childProcess.execSync('mkdir --parent ' + mountPoint);

  fuse.mount(mountPoint, {

    readdir: function(path, cb) {
      var items = [];
      var node = projectSync.getDirectory(path);
      if (node) {
        items = _(node.children).map((child) => {
          return child.name;
        });
      }
      return cb(0, items);
      cb(0);
    },

    getattr: function(path, cb) {
      var item = projectSync.getItem(path);
      if (item && item.type === 'file') {
        // Don't defer this part (as it's just returns the wrong file size) but
        // do kick off the loading of the content
        projectSync.readItem(path, (content) => {
          cb(0, {
            mtime: new Date(),
            atime: new Date(),
            ctime: new Date(),
            size: content.length,
            mode: 33188,
            uid: process.getuid(),
            gid: process.getgid()
          });
        }, false);
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
      var item = projectSync.getItem(path);
      var item = projectSync.getItem(path);
      if (item && item.type === 'file') {
        cb(0, nextFd++);
      } else {
        cb(fuse.ENOENT);
      }
    },

    read: function(path, fd, buf, len, pos, cb) {
      projectSync.readItem(path, (contents) => {
        if (!contents) {
          return cb(0);
        }
        var str = contents.substring(pos, pos + len);
        if (!str) {
          return cb(0);
        }
        buf.write(str);
        return cb(str.length);
      });
    }
  });

  process.on('SIGINT', function() {
    fuse.unmount('./mnt', function() {
      process.exit();
    });
  });
}

ProjectMount.prototype.unMount = function() {
  fuse.unmount(this.mountPoint_, () => {
    console.log('Unmounted ', this.mountPoint_);
  });
};

exports.ProjectMount = ProjectMount;
