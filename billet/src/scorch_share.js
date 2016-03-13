// Copyright 2015 Alec Thilenius
// All rights reserved.

var BCSocket = require('browserchannel').BCSocket;
var childProcess = require('child_process');
var sharejs = require('share');

var hostIp = childProcess.execSync(
  '/sbin/ip route|awk \'/default/ { print $3  }\'').toString().trim('\n');
var hostTarget = 'http://' + hostIp + ':' + process.env.FORGE_PORT + '/channel';
console.log('Connecting: ', hostTarget);
var socket = new BCSocket(hostTarget);
exports.sjs = new sharejs.client.Connection(socket);
