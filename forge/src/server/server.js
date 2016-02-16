// Copyright 2015 Alec Thilenius
// All rights reserved.

var Duplex = require('stream').Duplex;
var WebSocketServer = require('ws').Server;
var _ = require('underscore');
var billet = require('./billet.js');
var boot = require('loopback-boot');
var childProcess = require('child_process');
var http = require('http');
var httpProxy = require('http-proxy');
var io = require('socket.io');
var liveDbMongo = require('livedb-mongo');
var livedb = require('livedb');
var loopback = require('loopback');
var sharejs = require('share');

// Check envinroment for Mongo target, else use docker host
var mongoTarget = process.env.MONGO_TARGET || childProcess.execSync(
  '/sbin/ip route|awk \'/default/ { print $3  }\'').toString().trim('\n') +
  ':27017';
var db = liveDbMongo(
  'mongodb://' + mongoTarget + '/scorch?auto_reconnect', {
    safe: true
  });
var backend = livedb.client(db);

// Check ENV for billet image, use billet:dev otherwise
var billetImage = process.env.BILLET_IMAGE || 'athilenius/billet:dev';

// Setup LoopBack
var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
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
    var server = app.start();

    //===  ShareJS  ============================================================

    share = sharejs.server.createClient({
      backend
    });

    wss = new WebSocketServer({
      server
    });

    wss.on('connection', function(client) {
      var stream = new Duplex({
        objectMode: true
      });
      stream._write = function(chunk, encoding, callback) {
        client.send(JSON.stringify(chunk), function(error) {
          if (error) {
            console.log('Socket error: ', error);
          }
        });
        return callback();
      };
      stream._read = function() {};
      stream.headers = client.upgradeReq.headers;
      stream.remoteAddress = client.upgradeReq.connection.remoteAddress;
      client.on('message', function(data) {
        return stream.push(JSON.parse(data));
      });
      stream.on('error', function(msg) {
        return client.close(msg);
      });
      client.on('close', function(reason) {
        stream.push(null);
        stream.emit('close');
        return client.close(reason);
      });
      stream.on('end', function() {
        return client.close();
      });
      return share.listen(stream);
    });

    //===  ShareJS  ============================================================

    app.io = require('socket.io')(server);

    // For requesting a development environment
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
    loopbackTarget.web(req, res, function(err) {});
  }
});

// Listen to the `upgrade` event and proxy the WebSocket requests as well.
proxyServer.on('upgrade', function(req, socket, head) {
  if (!billet.proxyUpgrade(req, socket, head)) {
    loopbackTarget.ws(req, socket, head, function(err) {});
  }
});

proxyServer.listen(80);

console.log('        Start Time:', new Date());
console.log('      Billet Image:', billetImage);
console.log('     LoopBack Port: 3000');
console.log('    MongoDB Target:', mongoTarget);
console.log('  Node Environment:', process.env.NODE_ENV);
console.log('Reverse Proxy Port: 80');
