// Copyright 2015 Alec Thilenius
// All rights reserved.

/**
 * Helper 'Shell' class for programmaticly controlling a shell over Socket.IO
 */
var Shell = function(socket, id) {
  this.socket = socket;
  this.id = id;
  this.isOpen = true;

  this.write = function(data) {
    if (this.isOpen) {
      socket.emit(id + 'stdin', data, (err) => {
        this.isOpen = false;
      });
    }
    return this.isOpen;
  };

  this.onStderr = function(cb) {
    socket.on(id + 'stderr', cb);
  };

  this.onStdout = function(cb) {
    socket.on(id + 'stdout', cb);
  };

  this.close = function() {
    this.isOpen = false;
    socket.emit(id + 'close');
  };

};

var app = angular.module('app');

/**
 * At a high level, provides access to a billet session over Socket.IO. This
 * service will spin up a Billet Session, and connect to it. Use
 * billet.onReady(function(io){...}) to bind.
 */
app.service('billet', [
  '$timeout',
  'Person',
  'LoopBackAuth',
  function($timeout, Person, LoopBackAuth) {

    // DEBUG
    window.billet = this;

    this.readyCallbacks = [];
    this.lastSeenStatus = null;
    this.error = null;
    this.billetSocket = null;
    this.defferedSpawns = [];

    // Connect to the LoopBack hosted Socket.IO and request a login
    this.connect_ = function() {
      var lbSocket = io.connect();
      lbSocket.on('connect', () => {
        console.log('lb connect');
        lbSocket.on('statusUpdate', (data) => {
          lastSeenStatus = data;
          if (lastSeenStatus.stage === 3) {
            // Connect to the give billet session
            this.billetSocket = io.connect(location.protocol +
              '//' +
              location.hostname, {
                path: '/billet/' + Person.getCurrentId() +
                  '/socket.io'
              });
            // On Billet-Direct connection
            this.billetSocket.on('connect', () => {
              console.log('billet connect');
              this.billetSocket.emit('mount', {
                otDocId: Person.getCurrentId(),
                mountPoint: '/root/forge'
              });
              _(this.readyCallbacks).each((callback) => {
                callback(this.billetSocket);
              });
              // Also handle defered spawns
              this.defferedSpawns.forEach(this.spawnNow_);
            });
          }
        });
        // Attempt to login with access token
        lbSocket.emit('login', {
          accessToken: LoopBackAuth.accessTokenId
        }, (err) => {
          $timeout(function() {
            this.error = err;
          });
        });

      });
    };
    this.connect_();

    /**
     * Should be called only when a billet socket is open and active
     *
     * @private
     */
    this.spawnNow_ = function(cb) {
      this.billetSocket.emit('spawn', {}, (err, id) => {
        cb(new Shell(this.billetSocket, id));
      });
    };

    this.spawn = function(cb) {
      if (this.billetSocket && this.billetSocket.connected) {
        this.spawnNow_(cb);
      } else {
        this.defferedSpawns.push(cb);
      }
    };

    this.onReady = function(cb) {
      this.readyCallbacks.push(cb);
      if (this.billetSocket === 3) {
        cb(this.billetSocket);
      }
    };

  }
]);
