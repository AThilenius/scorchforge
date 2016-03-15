// Copyright 2015 Alec Thilenius
// All rights reserved.

var _ = require('underscore');
var childProcess = require('child_process');
var fuse = require('fuse-bindings');
var pss = require('./project_sync.js');

function ProjectMount(projectId, mountPoint) {
  this.projectId = projectId;
  this.mountPoint_ = mountPoint;

  console.log('Mounting project ', projectId, ' to ', mountPoint);
  this.projectSync_ = new pss.ProjectSync(projectId);
  this.nextFd = 1;

  // Create the directory if needed
  childProcess.execSync('mkdir --parent ' + mountPoint);

  var options = {};

  options.readdir = (path, cb) => {
    var items = [];
    var node = this.projectSync_.getDirectory(path);
    if (node) {
      items = _(node.children).map((child) => {
        return child.name;
      });
    }
    return cb(0, items);
    cb(0);
  };

  options.getattr = (path, cb) => {
    var item = this.projectSync_.getItem(path);
    if (item && item.type === 'file') {
      // Don't defer this part (as it's just returns the wrong file size) but
      // do kick off the loading of the content
      this.projectSync_.readItem(path, (content) => {
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
  };

  options.open = (path, flags, cb) => {
    var item = this.projectSync_.getItem(path);
    var item = this.projectSync_.getItem(path);
    if (item && item.type === 'file') {
      cb(0, this.nextFd++);
    } else {
      cb(fuse.ENOENT);
    }
  };

  options.read = (path, fd, buf, len, pos, cb) => {
    this.projectSync_.readItem(path, (contents) => {
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
  };

  fuse.mount(mountPoint, options);

  process.on('SIGINT', function() {
    fuse.unmount('./mnt', function() {
      process.exit();
    });
  });
}

ProjectMount.prototype.unMount = function(callback) {
  this.projectSync_.release();
  fuse.unmount(this.mountPoint_, () => {
    console.log('Unmounted ', this.mountPoint_);
    callback();
  });
};

ProjectMount.prototype.reMount = function(projectId) {
  console.log('Remounting: ', projectId, ' to /root/forge');
  if (this.projectSync_) {
    this.projectSync_.release();
  }
  this.projectSync_ = new pss.ProjectSync(projectId);
};

exports.ProjectMount = ProjectMount;
