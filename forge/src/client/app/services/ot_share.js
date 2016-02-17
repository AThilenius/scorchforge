// Copyright 2015 Alec Thilenius
// All rights reserved.

var app = angular.module('app');

/**
 * Does nothing more than host a single ShareJS WebSocket connection
 */
app.service('otShare', [function() {
  var protocol = window.location.protocol === 'https:' ?  'wss://' : 'ws://';
  var ws = new WebSocket(protocol + window.location.host);
  this.ot = new window.sharejs.Connection(ws);
}]);
