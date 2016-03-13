// Copyright 2015 Alec Thilenius
// All rights reserved.

/** @const */
var dockerHostIp = '172.17.0.1';

var _ = require('underscore');
var docker = new(require('dockerode'))();
var httpProxy = require('http-proxy');

/**
 * Clears all billet containers that match run types. This is a 'reliable' way
 * of making sure old containers are cleaned up.
 */
var reapStopedContainers_ = function() {
  // Yup, these are pretty fucking ugly...
  var filters = {
    'filters': JSON.stringify({
      status: ['exited', 'dead'],
      label: [
        'billetSession=',
        `runType=${process.env.RUN_TYPE}`
      ]
    })
  };
  docker.listContainers(filters, (err, containerInfos) => {
    containerInfos.forEach((containerInfo) => {
      docker.getContainer(containerInfo.Id).remove((err, data) => {
        console.log('Reaping ', containerInfo.Id);
        if (err) {
          console.log('Failed to remove container: ', err);
        }
      });
    });
  });
};

// Reap stopped containers every 5 seconds
setInterval(reapStopedContainers_, 5000);

/**
 * Creates a new session (without checking for locks) and boots up a new Docker
 * container.
 *
 * @param {string} accessToken The user's current LoopBack access token
 * @param {string} userId The UserID from LoopBack
 * @param {function(string|null, string|null)} callback The callback that will
 * be called when the container is ready.
 */
exports.createSession = function(accessToken, userId, callback) {
  // Check if the container already exists
  var filters = {
    'filters': JSON.stringify({
      status: ['running'],
      label: [
        'billetSession=',
        `runType=${process.env.RUN_TYPE}`,
        `lbUserId=${userId}`
      ]
    })
  };
  docker.listContainers(filters, (err, containerInfos) => {
    if (err) {
      console.log('Billet listContainers error: ', err);
      return callback('Internal Server Error');
    }
    if (containerInfos.length > 0) {
      // Just retun ready
      return callback(null, {
        ready: true
      });
    }
    // Create the container
    var mb = 1000000;
    docker.createContainer({
      Image: process.env.BILLET_IMAGE,
      name: 'billet-' + process.env.RUN_TYPE + '-' + userId,
      Labels: {
        billetSession: null,
        lbUserId: userId,
        runType: process.env.RUN_TYPE
      },
      Env: [
        'FORGE_PORT=' + process.env.PUBLISHED_PORT.toString(),
        'RUN_TYPE=' + process.env.RUN_TYPE.toString()
      ],
      HostConfig: {
        // Added CAPs for FUSE binding
        CapAdd: ['SYS_ADMIN'],
        Devices: [{
          'PathOnHost': '/dev/fuse',
          'PathInContainer': '/dev/fuse',
          'CgroupPermissions': 'mrw'
        }]
      },
      Memory: 512 * mb,
      MemorySwap: 2048 * mb,
      // Relative 0 - inf, default 'docker run' is 1024 shares
      CpuShares: 128,
      // Realtive 1 - 1000
      BlkioWeight: 100
    }, (err, container) => {
      if (err || !container) {
        console.log('Billet container create error: ', err);
        return callback('Internal Server Error');
      }
      // Start Container
      container.start((err, data) => {
        if (err) {
          console.log('Billet container start error: ', err);
          return callback('Internal Server Error');
        }
        callback(null, {
          ready: true
        });
        console.log('Created Billet session: ', userId);
      });
    });
  });
};

var getUserIdFromUrl_ = function(url) {
  var re = /\/billet\/([^\/]*)\//i;
  var matches = re.exec(url);
  if (matches && matches.length === 2) {
    return {
      userId: matches[1],
      newUrl: '/' + url.replace(matches[0], '')
    };
  }
  return null;
};

var proxy = function(req, proxyFn, cantHandleCb) {
  var userIdAndUrl = getUserIdFromUrl_(req.url);
  if (!userIdAndUrl) {
    return cantHandleCb();
  }
  // Search for a docker container
  var filters = {
    'filters': JSON.stringify({
      status: ['running'],
      label: [
        'billetSession=',
        `runType=${process.env.RUN_TYPE}`,
        `lbUserId=${userIdAndUrl.userId}`
      ]
    })
  };
  docker.listContainers(filters, (err, containerInfos) => {
    if (err) {
      return console.log('Billet listContainers error: ', err);
    }
    if (containerInfos.length === 0) {
      return cantHandleCb();
    }
    docker.getContainer(containerInfos[0].Id).inspect((err, container) => {
      if (err || !container) {
        return console.log('Billet getContainer error: ', err);
      }
      // Found container
      req.url = userIdAndUrl.newUrl;
      var proxyTarget = httpProxy.createProxy({
        target: {
          host: container.NetworkSettings.IPAddress,
          port: 7390
        },
        ws: true
      });
      proxyFn(proxyTarget);
    });
  });
  // Never return /billet/* routes back to LoopBack even if they don't exist, so
  // don't call the cantHandleCb
};

/**
 * If a session has already been created and a userId has been acosiated with
 * it, then the route: /billet/<userID> will be proxied to the clients
 * container and true will be returned. False if not proxied.
 *
 * @param {object} req The Express request object.
 * @param {object} res The Express result object.
 * @param {function()} cantProxyCb The callback that will be invoked if Billet
 * can't proxy this call
 */
exports.proxyHttp = function(req, res, cantProxyCb) {
  proxy(req, function(proxyTarget) {
    proxyTarget.web(req, res, function(err) {
      res.writeHead(202, {
        'Content-Type': 'text/plain'
      });
      res.end('Stand-by, container is probably booting\n');
    });
  }, cantProxyCb);
};

/**
 * If a session has already been created and a userId has been acosiated with
 * it, then the route: /billet/<userID> will be proxied to the clients
 * container and true will be returned. False if not proxied.
 *
 * @param {object} req The Express request object.
 * @param {object} socket The WebSocket
 * @param {object} head Honestly, no idea what this is
 * @param {function()} cantProxyCb The callback that will be invoked if Billet
 * can't proxy this call
 */
exports.proxyUpgrade = function(req, socket, head, cantProxyCb) {
  proxy(req, function(proxyTarget) {
    proxyTarget.ws(req, socket, head, function(err) {
      console.log('Upgrade Proxy Error: ', err);
    });
  }, cantProxyCb);
};
