"use strict";


import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import path from 'path';
import logger from 'morgan';
import huejay from 'huejay';

import hueConfig from './config/hueConfig.js';


const app = express();
const port = 3000;

const client = new huejay.Client(hueConfig);
console.log(path.join(__dirname, './public'));
app.use(express.static(path.join(__dirname, './public')));

// app.use((req, res) => {
//   res.send({ msg: "hello" });
// });

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
  console.log('a user connected' );
  ws.on('message', (message) => {
    console.log('received: %s', message);
  });
  ws.on('close',()=>{
  	console.log('a user disconnected');
  })
});

server.listen(port, () => {
  console.log('Listening on %d', server.address().port);
});
