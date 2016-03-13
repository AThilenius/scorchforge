// Copyright 2015 Alec Thilenius
// All rights reserved.

module.exports = function(Project) {
  var app = require('../../server/server');

  Project.addDiff = function(id, diff, cb) {
    // TODO(athilenius): I think there 'might' be a race condition here is 2
    // people add a diff at the same time. The first diff will be lost, I think.
    app.models.Project.findById(id, (err, instance) => {
      if (err || !instance) {
        console.log('Failed to find project during POST /diff: ', err);
        return;
      }
      // TODO(athilenius): Need to do an ownership check
      var newDiffList = instance.fileTree.concat(diff);
      instance.updateAttribute('fileTree', newDiffList, (err) => {
        if (!err) {
          // Push change to SocketIO
          app.io.emit('project-' + id + '-fileTree', newDiffList);
        }
        cb(err);
      });
    });
  };

  Project.remoteMethod(
    'addDiff', {
      http: {
        path: '/:id/diff',
        verb: 'post'
      },
      accepts: [{
        arg: 'id',
        type: 'string',
        required: true
      }, {
        arg: 'diff',
        type: 'object',
        required: true
      }]
    }
  );

};
