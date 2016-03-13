// Copyright 2015 Alec Thilenius
// All rights reserved.

/**
 * Helper 'Shell' class for programmaticly controlling a shell over Socket.IO
 */
var Shell = function(socket, id) {
  this.socket = socket;
  this.id = id;
  this.exitCode = null;

  this.socket.on(id + 'closed', (exitCode) => {
    this.exitCode = exitCode || -1;
  });

  this.write = function(data) {
    if (!this.exitCode) {
      socket.emit(id + 'stdin', data, () => {});
    }
    return !this.exitCode;
  };

  this.onStderr = function(cb) {
    socket.on(id + 'stderr', cb);
  };

  this.onStdout = function(cb) {
    socket.on(id + 'stdout', cb);
  };

  this.onClose = function(cb) {
    socket.on(id + 'closed', cb);
  };

  this.close = function() {
    socket.emit(id + 'close');
  };

  /**
   * Runs a shell command, gets the output (sent to
   * cb(stdout, stderr, editCode){ }) and closes the shell. The CB will not be
   * called until the shell has been closed, meaning all output has been read.
   */
  this.execAndClose = function(command, cb) {
    var stdOut = '';
    var stdErr = '';
    this.onStdout((out) => {
      stdOut += out;
    });
    this.onStderr((err) => {
      stdErr += err;
    });
    this.onClose((exitCode) => {
      cb(stdOut, stdErr, exitCode);
    });
    this.write(command + '\nexit\n');
  };

};

var app = angular.module('app');

/**
 * At a high level, provides access to a billet session over Socket.IO. This
 * service will spin up a Billet Session, and connect to it. Use
 * billet.onReady(function(io){...}) to bind.
 */
app.service('billet', [
  '$rootScope',
  '$timeout',
  'Person',
  'LoopBackAuth',
  'data',
  function($rootScope, $timeout, Person, LoopBackAuth, data) {

    this.readyCallbacks = [];
    this.error = null;
    this.billetSocket = null;

    // Connect to the LoopBack hosted Socket.IO and request a login
    this.connect = function() {
      var lbSocket = io.connect();
      lbSocket.on('connect', () => {
        console.log('Connected to the primary LoopBack Socket.io');
        // Attempt to login with access token
        lbSocket.emit('login', {
          accessToken: LoopBackAuth.accessTokenId
        }, (err, data) => {
          if (err) {
            return console.log('Billet login error: ', err);
          }
          if (data.ready) {
            console.log('Connecting to Billet');
            var url = location.protocol + '//' + location.hostname;
            this.billetSocket = io.connect(url, {
              path: '/billet/' + Person.getCurrentId() +
                '/socket.io'
            });
            // On Billet-Direct connection
            this.billetSocket.on('connect', () => {
              console.log('Connected to Billet!');
              _(this.readyCallbacks).each((callback) => {
                callback(this.billetSocket);
              });
              this.readyCallbacks = [];
            });
          }
        });

      });
    };

    this.onReady = function(cb) {
      if (this.billetSocket && this.billetSocket.connected) {
        cb(this.billetSocket);
      } else {
        this.readyCallbacks.push(cb);
      }
    };

    this.spawn = function(cb) {
      this.onReady(() => {
        this.billetSocket.emit('spawn', {}, (err, id) => {
          cb(new Shell(this.billetSocket, id));
        });
      });
    };

    // Watch for changes to data.activeProject and mount it in Billet
    $rootScope.$watch(() => {
      return data.activeProject;
    }, (newVal, oldVal) => {
      if (newVal && newVal.id) {
        this.onReady(() => {
          this.billetSocket.emit('mount', {
            projectId: newVal.id
          });
        });
      }
    });

  }
]);
