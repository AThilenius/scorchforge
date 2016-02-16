// Copyright 2015 Alec Thilenius
// All rights reserved.

var childProcess = require('child_process');

var mongoUri = 'mongodb://' +
  (process.env.MONGO_TARGET || childProcess.execSync(
      '/sbin/ip route|awk \'/default/ { print $3  }\'').toString().trim('\n') +
    ':27017') + '/scorch';

module.exports = {
  'db': {
    defaultForType: 'db',
    connector: 'loopback-connector-mongodb',
    url: mongoUri
  }
};
