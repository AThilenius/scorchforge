// Copyright 2015 Alec Thilenius
// All rights reserved.

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

    this.readyCallbacks = [];
    this.lastSeenStatus = null;
    this.error = null;
    this.billetSocket = null;

    // Connect to the LoopBack hosted Socket.IO and request a login
    this.connect_ = function() {
      var lbSocket = io.connect();
      var that = this;
      lbSocket.on('connect', function() {
        console.log('lb connect');

        lbSocket.on('statusUpdate', function(data) {
          lastSeenStatus = data;
          if (lastSeenStatus.stage === 3) {
            // Connect to the give billet session
            that.billetSocket = io.connect(location.protocol +
              '//' +
              location.hostname, {
                path: '/billet/' + Person.getCurrentId() + '/socket.io'
              });

            that.billetSocket.on('connect', function() {
              console.log('billet connect');
              _(that.readyCallbacks).each(function(callback) {
                callback(that.billetSocket);
              });
            });

          }
        });

        lbSocket.emit('login', {
          accessToken: LoopBackAuth.accessTokenId
        }, function(err) {
          $timeout(function() {
            that.error = err;
          });
        });

      });
    };
    this.connect_();

    this.onReady = function(cb) {
      this.readyCallbacks.push(cb);
      if (this.billetSocket === 3) {
        cb(this.billetSocket);
      }
    };

  }
]);
