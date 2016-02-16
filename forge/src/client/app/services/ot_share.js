// Copyright 2015 Alec Thilenius
// All rights reserved.

var app = angular.module('app');

/**
 * Does nothing more than host a single ShareJS WebSocket connection
 */
app.service('otShare', [function() {
  var ws = new WebSocket('wss://' + window.location.host);
  this.ot = new window.sharejs.Connection(ws);
}]);
