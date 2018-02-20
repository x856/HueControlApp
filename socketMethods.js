'use strict';

import huejay from 'huejay';

import config from './config/hueConfig.js';

const client = new huejay.Client(config.hueConfig);

const methods = {
	'getAllLightStatus':(message,wss)=>{
		return client.lights.getAll()
		.then(lights =>{
			wss.broadcast(JSON.stringify(lights));
		})

	},
	'getLightStatus': (message,wss)=>{
		return client.lights.getById(parseInt(message.lightId))
		.then(light=>{
			wss.broadcast(JSON.stringify(light));
		})
	},
	'setLightState':(message,wss)=>{
		return client.lights.getById(parseInt(message.lightId))
		.then(light=>{
			Object.assign(light, message.data);
			return client.lights.save(light).then(light=>{
				wss.broadcast(JSON.stringify(light));
			});
		});
	}
}

module.exports = methods;