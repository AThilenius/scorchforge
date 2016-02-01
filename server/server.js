var boot = require('loopback-boot');
var express = require('express');
var http = require('http');
var httpProxy = require('http-proxy');
var io = require('socket.io');
var loopback = require('loopback');
var pty = require('pty.js');
var terminal = require('term.js');
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
    app.start();
  }

  //============================================================================
  //==  Start of  sample Term.js stuff. It will be removed  ====================
  //============================================================================
  var socket;
  var term;
  var buff = [];
  // create shell process
  term = pty.fork(
    process.env.SHELL || 'bash', [], {
      name: require('fs').existsSync(
          '/usr/share/terminfo/x/xterm-256color') ?
        'xterm-256color' : 'xterm',
      cols: 80,
      rows: 24,
      cwd: process.env.HOME
    }
  );

  // store term's output into buffer or emit through socket
  term.on('data', function(data) {
    return !socket ? buff.push(data) : socket.emit('data', data);
  });

  console.log(
    'Created shell with pty master/slave pair (master: %d, pid: %d)',
    term.fd,
    term.pid);

  var expressApp = express();
  var server = http.createServer(expressApp);

  // let term.js handle req/res
  expressApp.use(terminal.middleware());

  // let server listen on the port
  server.listen(8080);

  // let socket.io handle sockets
  io = io.listen(server, {
    log: false
  });
  //io.set('origins', '*');

  io.sockets.on('connection', function(s) {
    // when connect, store the socket
    socket = s;

    // handle incoming data (client -> server)
    socket.on('data', function(data) {
      term.write(data);
    });

    // handle connection lost
    socket.on('disconnect', function() {
      socket = null;
    });

    socket.on('resize', function(size) {
      term.resize(size.cols + 1, size.rows + 1);
      setTimeout(function() {
        term.resize(size.cols, size.rows);
      });
    });

    // send buffer data to client
    while (buff.length) {
      socket.emit('data', buff.shift());
    };
  });
  //============================================================================
  //==  End of  sample Term.js stuff. It will be removed  ======================
  //============================================================================

  // Put all of it behin a proxy on P80
  var httpTarget = httpProxy.createProxy({
    target: {
      host: 'localhost',
      port: 3000
    }
  });

  var wsTarget = httpProxy.createProxy({
    target: {
      host: 'localhost',
      port: 8080
    },
    ws: true
  });

  var proxyServer = http.createServer(function(req, res) {
    if (req.url.indexOf('/sample') === 0) {
      req.url = req.url.slice('/sample'.length);
      wsTarget.web(req, res);
    } else {
      httpTarget.web(req, res);
    }
  });

  // Listen to the `upgrade` event and proxy the WebSocket requests as well.
  proxyServer.on('upgrade', function(req, socket, head) {
    if (req.url.indexOf('/sample') === 0) {
      req.url = req.url.slice('/sample'.length);
      wsTarget.ws(req, socket, head);
    } else {
      httpTarget.ws(req, socket, head);
    }
  });

  proxyServer.listen(80);

});
