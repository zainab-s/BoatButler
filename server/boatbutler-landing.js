// Get dependencies
require('../configEnv');

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api')

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, '../dist')));
// using the apiRouter function for APIs
app.use('/' , apiRouter());

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT;
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on ${process.env.HOST}:${port} in ${process.env.NODE_ENV} mode`));
