// Copyright 2015 Alec Thilenius
// All rights reserved.

var childProcess = require('child_process');
var ioClient = require('socket.io-client');

var hostIp = childProcess.execSync(
  '/sbin/ip route|awk \'/default/ { print $3  }\'').toString().trim('\n');
var hostTarget = 'http://' + hostIp + ':' + process.env.FORGE_PORT;
console.log('Connecting Socket.io to ', hostTarget);

exports.socket = ioClient.connect(hostTarget, {
  reconnect: true
});

exports.socket.on('connect_error', (err) => {
  console.log('Socket.IO client connection error: ', err);
});

exports.socket.on('error', (err) => {
  console.log('Socket.IO client error: ', err);
});

exports.socket.on('connect', (socket) => {
  console.log('Connected to Forge Socket.io!');
});
