'use strict';


import util from 'util';

import methods from './socketMethods.js'

const socketHandler = (wss)=>{
	wss.on('connection', (ws, req) => {
		console.log('a user connected' );
		ws.on('message', (message) => {
			console.log('received: %s', message);
			try{
				message = JSON.parse(message);
			}
			catch(error){
				ws.send({'error':'JSON parsing error'});
				console.log(error.message);
			}
			finally{
				if(message.method && methods.hasOwnProperty(message.method)){
					let method = methods[message.method];
					method(message,ws).catch(error => {
						ws.send(JSON.stringify(error.message));
					    console.log(error.stack);
					});
				}
				else{
					ws.send(JSON.stringify({'error':'method Error'}));
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