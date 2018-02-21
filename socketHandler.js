'use strict';


import util from 'util';

import methods from './socketMethods.js'

const WebSocket = require('ws');

const socketHandler = (wss)=>{
	wss.broadcast = (data)=>{
	  wss.clients.forEach((client)=> {
	    if (client.readyState === WebSocket.OPEN) {
	      client.send(data);
	    }
	  });
	};
	wss.on('connection', (ws, req) => {
		const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		console.log('a user connected from %s',ip );
		ws.on('message', (message) => {
			console.log('received: %s', message);
			try{
				message = JSON.parse(message);
			}
			catch(error){
				wss.broadcast({'error':'JSON parsing error'});
				console.log(error.message);
			}
			finally{
				if(message.method && methods.hasOwnProperty(message.method)){
					let method = methods[message.method];
					method(message,wss).catch(error => {
						wss.broadcast(JSON.stringify({error:error.message}));
					    console.log(error.stack);
					});
				}
				else{
					wss.broadcast(JSON.stringify({'error':'method Error'}));
				}	
			}
		});
		ws.on('close',()=>{
			console.log('a user disconnected');
		});
		ws.on('error',()=>{
			console.log(error.message);
		})
	});
}


module.exports = socketHandler;

