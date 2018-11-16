'use strict';
const fs = require('fs');

const configs = JSON.parse(fs.readFileSync('./env.json', 'utf8'));

(function() {
  const config = configs[process.env.NODE_ENV] || configs['local'];

  for (let envVar in config) {
    process.env[envVar] = config[envVar];
  }
})();
