var _ = require('underscore');
var billet = require('./billet.js');
var boot = require('loopback-boot');
var express = require('express');
var http = require('http');
var httpProxy = require('http-proxy');
var io = require('socket.io');
var loopback = require('loopback');
var url = require('url');
var util = require('util');

// Setup LoopBack
var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) {
    throw err;
  }
  // start the server if `$ node server.js`
  if (require.main === module) {
    app.io = require('socket.io')(app.start());

    // Socket.IO for requesting a development environment
    app.io.on('connection', function(socket) {

      // Authenticate new connections, and fire up a Billet session
      socket.on('login', function(data, callback) {
        var accessToken = data.accessToken;
        if (!accessToken) {
          return callback('Missing AccessToken');
        }
        // Check the token
        app.models.AccessToken.findById(accessToken, function(err,
          token) {
          if (err || !token) {
            return callback('Invalid AccessToken');
          }
          // Authorized, file up a Billet session
          billet.createSession(accessToken, token.userId,
            socket, 'athilenius/billet_session');
        });
      });

      // console.log('User connected');
      socket.on('disconnect', function() {
        // console.log('user disconnected');
      });
    });

  }
});

var loopbackTarget = httpProxy.createProxy({
  target: {
    host: 'localhost',
    port: 3000
  }
});

var proxyServer = http.createServer(function(req, res) {
  if (!billet.proxyHttp(req, res)) {
    loopbackTarget.web(req, res, function(err) {
      console.log('Error while proxying to LoopBack: ', err);
    });
  }
});

// Listen to the `upgrade` event and proxy the WebSocket requests as well.
proxyServer.on('upgrade', function(req, socket, head) {
  if (!billet.proxyUpgrade(req, socket, head)) {
    loopbackTarget.ws(req, socket, head, function(err) {
      console.log('Error while proxying to LoopBack: ', err);
    });
  }
});

proxyServer.listen(80);
