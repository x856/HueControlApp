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

	}
}

module.exports = methods;