// Copyright 2015 Alec Thilenius
// All rights reserved.

/** @const */
var dockerHostIp = '172.17.0.1';

var _ = require('underscore');
var docker = new(require('dockerode'))();
var httpProxy = require('http-proxy');

/** @const */
var nextPort_ = 20000;

/**
 * Holds a list of ports that were allocated then freed.
 *
 * @type {Array<number>}
 */
var portFreeList_ = [];

/**
 * We sadly have to keep an allocated list as well for containers that are
 * readded at startup time. Their port number could be anything.
 */
var portAllocList_ = {};

/**
 * Maps LoopBack userIds to session objects.
 *
 * @type {Object<string, object>}
 */
var userIdToSession_ = {};

/**
 * Allocates a port that is not being used. This will come from a free pool or
 * from a new port counting up from 20,000. If a port is passed in then the port
 * is reserved and a boolean is returned indicating success.
 *
 * @param {?number} port Optional port to reseve
 * @return {number|boolean}
 */
var allocPort_ = function(port) {
  if (port) {
    if (portAllocList_[port]) {
      // Bad times. These is somehow a duplicate
      return false;
    } else {
      portAllocList_[port] = true;
      return true;
    }
  } else {
    if (portFreeList_.length > 0) {
      return portFreeList_.shift();
    } else {
      // Allocate a new port, but make sure it's not in the alloc set
      var p = nextPort_++;
      while (portAllocList_[p]) {
        p = nextPort_++;
      }
      return p;
    }
  }
};

/**
 * Reconstructs sessions from running containers
 */
var reconnectRunningSession_ = function() {
  docker.listContainers(function(err, containerInfos) {
    // Manually filter labels as the API seems to ignore that filter
    _.chain(containerInfos).filter(function(containerInfo) {
      return containerInfo.Labels &&
        typeof(containerInfo.Labels.billetSession) !== 'undefined';
    }).each(function(containerInfo) {
      var container = docker.getContainer(containerInfo.Id);
      var lbUserId = containerInfo.Labels.lbUserId;
      if (!lbUserId || lbUserId === '' || containerInfo.Ports.length !==
        1) {
        console.log('Failed to reattach container, info missing: ',
          containerInfo);
        return;
      }
      var ip = dockerHostIp;
      var port = containerInfo.Ports[0].PublicPort;
      allocPort_(port);
      session = {
        locked: false,
        userId: lbUserId,
        port: port,
        container: container,
        ip: ip,
        proxyTarget: httpProxy.createProxy({
          target: {
            host: ip,
            port: port
          },
          ws: true
        })
      };
      // Register it
      userIdToSession_[lbUserId] = session;
      console.log('Readded session: ', lbUserId, ' on port: ', port);
    });
  });
};

// Reconnect running session on boot
reconnectRunningSession_();

/**
 * Clears all billet containers that start with the name 'billet-'
 */
var reapStopedContainers_ = function() {
  docker.listContainers({
    filters: JSON.stringify({
      status: ['exited']
    })
  }, function(err, containerInfos) {
    // Manually filter labels as the API seems to ignore that filter
    _.chain(containerInfos).filter(function(containerInfo) {
      return containerInfo.Labels &&
        typeof(containerInfo.Labels.billetSession) !== 'undefined';
    }).each(function(containerInfo) {
      docker.getContainer(containerInfo.Id).remove(function(err, data) {
        console.log('Reaping ', containerInfo.Id);
        if (err) {
          console.log('Failed to remove container: ', err);
        }
      });
    });
  });
};

// Reap stopped containers every 5 seconds
var reapingInterval = setInterval(reapStopedContainers_, 5000);

/**
 * Frees the given session, killing and removing the docker image, removing it
 * from the userIdToSession_ table and freeing the port allocation.
 *
 * @param {object} session The session to free
 */
var freeSession_ = function(session) {
  session.locked = true;
  if (session.container) {
    session.container.stop(function(stopErr, stopData) {
      session.container.remove(function(removeErr, removeData) {
        // Fully remove the session
        portFreeList_.push(session.port);
        delete userIdToSession_[session.userId];
      });
    });
  }
};

/**
 * Creates a new session (without checking for locks) and boots up a new Docker
 * container.
 *
 * @param {string} accessToken The user's current LoopBack access token
 * @param {string} userId The UserID from LoopBack
 * @param {object} socket The Socket.IO client socket
 * @param {string} dockerImage The name of the docker image to boot
 */
exports.createSession = function(accessToken, userId, socket, dockerImage) {
  var messages = [
    'Creating personal container',
    'Pulling personal image',
    'Starting personal container',
    'Ready'
  ];
  var errorMessages = [
    'Failed to create personal container',
    'Failed to pull personal container image',
    'Failed to start personal container'
  ];
  var session = userIdToSession_[userId];
  if (session) {
    // If the session is locked, just return
    if (session.locked) {
      console.log('Session locked, cancling login request');
      return;
    }
    // If it's fully set up, emit the ready event
    if (session.proxyTarget) {
      socket.emit('statusUpdate', {
        stage: 3,
        stageMessage: messages[3]
      });
    }
    return;
  }
  session = {
    locked: true,
    userId: userId,
    port: allocPort_(),
    container: null
  };
  userIdToSession_[userId] = session;

  var emitStatusUpdate = function(stage) {
    socket.emit('statusUpdate', {
      stage: stage,
      stageMessage: messages[stage],
    });
    if (stage === 3) {
      session.locked = false;
    }
  };

  var emitError = function(stage, internalError) {
    socket.emit('statusUpdate', {
      error: errorMessages[stage],
      internalError: internalError
    });
    // Compleatly free the session as it failed
    freeSession_(session);
  };

  // Create Container
  emitStatusUpdate(0);
  docker.createContainer({
    Image: dockerImage,
    name: 'billet-' + userId,
    ExposedPorts: {
      '7390/tcp': {}
    },
    Labels: {
      billetSession: null,
      lbUserId: session.userId
    },
    HostConfig: {
      PortBindings: {
        '7390/tcp': [{
          'HostPort': session.port.toString()
        }]
      }
    }
  }, function(err, container) {
    // Start Container
    if (err || !container) {
      return emitError(0, err);
    }
    emitStatusUpdate(2);
    session.container = container;
    container.start(function(err, data) {
      if (err) {
        return emitError(2, err);
      }
      // TODO(athilenius): With DockSwarm, I need to pull the IP address out
      // from the new container
      session.ip = dockerHostIp;
      session.proxyTarget = httpProxy.createProxy({
        target: {
          host: session.ip,
          port: session.port
        },
        ws: true
      });
      emitStatusUpdate(3);
      console.log('Created Billet session: ', session.userId);
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

var proxy = function(req, proxyFn) {
  var userIdAndUrl = getUserIdFromUrl_(req.url);
  if (userIdAndUrl) {
    var session = userIdToSession_[userIdAndUrl.userId];
    if (session && !session.locked && session.proxyTarget) {
      req.url = userIdAndUrl.newUrl;
      proxyFn(session);
      return true;
    }
  }
  return false;
};

/**
 * If a session has already been created and a userId has been acosiated with
 * it, then the route: /billet/<userID> will be proxied to the clients
 * container and true will be returned. False if not proxied.
 *
 * @param {object} req The Express request object.
 * @param {object} res The Express result object.
 */
exports.proxyHttp = function(req, res) {
  return proxy(req, function(session) {
    session.proxyTarget.web(req, res, function(err) {
      res.writeHead(202, {
        'Content-Type': 'text/plain'
      });
      res.end('Stand-by, container is probably booting\n');
    });
  });
};

/**
 * If a session has already been created and a userId has been acosiated with
 * it, then the route: /billet/<userID> will be proxied to the clients
 * container and true will be returned. False if not proxied.
 *
 * @param {object} req The Express request object.
 * @param {object} socket The WebSocket
 * @param {object} head Honestly, no idea what this is
 */
exports.proxyUpgrade = function(req, socket, head) {
  return proxy(req, function(session) {
    session.proxyTarget.ws(req, socket, head, function(err) {
      console.log('Upgrade Proxy Error: ', err);
    });
  });
};
