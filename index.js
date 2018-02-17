"use strict";

const util = require('util')
import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import path from 'path';
import logger from 'morgan';
import huejay from 'huejay';

import config from './config/hueConfig.js';


const app = express();
const port = 3000;

const client = new huejay.Client(config.hueConfig);
app.use(express.static(path.join(__dirname, './public')));


const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
  console.log('a user connected' );
  ws.on('message', (message) => {
  	message = JSON.parse(message);
  	if(message.method){
  		if(message.method ==='getLightStatus'){
  			client.lights.getById(1)
  			.then(light=>{
  				ws.send(JSON.stringify(light));
  			})
  			.catch(error=>{
  				console.log(error.stack);
  			})
  		}
  	}
    console.log('received: %s', message);
  });
  ws.on('close',()=>{
  	console.log('a user disconnected');
  })
});

server.listen(port, () => {
  console.log('Listening on %d', server.address().port);
});
