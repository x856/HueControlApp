'use strict';


import util from 'util';

import huejay from 'huejay';

import config from './config/hueConfig.js';

import methods from './socketMethods.js'

const client = new huejay.Client(config.hueConfig);




const socketHandler = (wss)=>{
	wss.on('connection', (ws, req) => {
		console.log('a user connected' );
		ws.on('message', (message) => {
			console.log('received: %s', util.inspect(message, false, null));
			parseMessage(message,ws);
		});
		ws.on('close',()=>{
			console.log('a user disconnected');
		});
		ws.on('error',()=>{
			console.log(error.message);
		})
	});
}

const parseMessage = (message,ws)=>{
	message = JSON.parse(message);
	if(message.method in methods){
		methods[message.method](message,ws);
	}	
}

module.exports = socketHandler;