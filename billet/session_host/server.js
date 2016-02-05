// Copyright 2015 Alec Thilenius
// All rights reserved.

var express = require('express');
var http = require('http');
var io = require('socket.io');
var pty = require('pty.js');
var terminal = require('term.js');

var socket;
var buff = [];

var newShortUuid = function() {
  const ALPHABET =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const ID_LENGTH = 8;
  var rtn = '';
  for (var i = 0; i < ID_LENGTH; i++) {
    rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return rtn;
};

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
term.on('data', (data) => {
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

io.sockets.on('connection', (s) => {
  socket = s;

  socket.on('spawn', (data, callback) => {
    var id = newShortUuid();
    var stream = require('child_process').spawn('/bin/sh', []);
    // Catpure STDOUT
    stream.stdout.on('data', (data) => {
      socket.emit(id + 'stdout', data.toString());
    });
    // Capture STDERR
    stream.stderr.on('data', (data) => {
      socket.emit(id + 'stderr', data.toString());
    });
    // On Socket.IO STDIN
    socket.on(id + 'stdin', (data, callback) => {
      if (!stream) {
        callback('Shell closed');
      } else {
        stream.stdin.write(data);
      }
    });
    // On Socket.IO asking to close shell
    socket.on(id + 'close', () => {
      stream.kill();
      stream = null;
    });
    callback(null, id);
  });

  // ==== Normal Term.js Stuff  ================================================

  socket.on('data', (data) => {
    term.write(data);
  });

  socket.on('disconnect', () => {
    socket = null;
  });

  socket.on('resize', (size) => {
    term.resize(size.cols + 1, size.rows + 1);
    setTimeout(() => {
      term.resize(size.cols, size.rows);
    });
  });

  while (buff.length) {
    socket.emit('data', buff.shift());
  };
});

console.log('Billet Session Host active on WS port 7390');
