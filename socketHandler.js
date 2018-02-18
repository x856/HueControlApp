'use strict';


import util from 'util';

import methods from './socketMethods.js'


const socketHandler = (wss)=>{
	wss.on('connection', (ws, req) => {
		console.log('a user connected' );
		ws.on('message', (message) => {
			console.log('received: %s', util.inspect(message, false, null));
			message = JSON.parse(message);
			if(message.method in methods){
				let method = methods[message.method];
				method(message,ws).catch(error => {
					ws.send(JSON.stringify(error.message));
				    console.log(error.stack);
				});
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