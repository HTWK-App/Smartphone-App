// npm install pushstate-server
// nodejs server.js
'use strict';

// Defines
const PORT = 8080;
const DIR = './www';

// Create server
var server = require('pushstate-server');

// Start server
server.start({
  port: PORT,
  directory: DIR
});
