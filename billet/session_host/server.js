// Copyright 2015 Alec Thilenius
// All rights reserved.

var express = require('express');
var http = require('http');
var io = require('socket.io');
var pty = require('pty.js');
var terminal = require('term.js');

var socket;
var buff = [];

// create shell process
var term = pty.fork(
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

var expressApp = express();
var server = http.createServer(expressApp);

// let term.js handle req/res
expressApp.use(terminal.middleware());

// let server listen on the port
server.listen(7390);

// let socket.io handle sockets
io = io.listen(server, {
  log: true
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

console.log('Billet Session Host active on WS port 7390');
