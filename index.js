"use strict";

import http from 'http';
import WebSocket from 'ws';
import SocketHandler from './socketHandler.js';
import app from './express.js';
import config from './config/expressConfig.js'

const port = config.port;

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const socketHandler = new SocketHandler(wss);

server.listen(port, () => {
  console.log('Listening on %d', server.address().port);
});

module.exports = app;