'use strict';

import huejay from 'huejay';

import config from './config/hueConfig.js';

const client = new huejay.Client(config.hueConfig);

const methods = {
	'getAllLightStatus':(message,wss)=>{
		return client.lights.getAll()
		.then(lights =>{
			wss.broadcast(JSON.stringify({lights:lights}));
		})

	},
	'getLightStatus': (message,wss)=>{
		return client.lights.getById(parseInt(message.lightId))
		.then(light=>{
			wss.broadcast(JSON.stringify({lights:light}));
		})
	},
	'setLightState':(message,wss)=>{
		return client.lights.getById(parseInt(message.lightId))
		.then(light=>{
			Object.assign(light, message.data);
			return client.lights.save(light).then(light=>{
				wss.broadcast(JSON.stringify({lights:light}));
			});
		});
	},
	'searchForBridges':(message,wss)=>{
		return huejay.discover({strategy: 'all'})
		.then(bridges => {
			wss.broadcast(JSON.stringify({bridges:bridges}));
		});

	},
	'addUserToBridge':(message,wss)=>{
		let user = new client.users.User;
 
		user.deviceType = 'HueWebApp'; // Default is 'huejay'
 
		return client.users.create(user)
  		.then(user => {
    		console.log(`New user created - Username: ${user.username}`);
    		wss.broadcast(JSON.stringify({result:'success'}));
  		})
		.catch(error => {
			if (error instanceof huejay.Error && error.type === 101) {
			  console.log(`Link button not pressed. Try again...`);
			  wss.broadcast(JSON.stringify({error:`Link button not pressed. Try again...`}));
		
			}
			else{
	    		console.log(error.message);
	    		wss.broadcast(JSON.stringify({error:error.message}));
			}
  		});
	}
}

module.exports = methods;