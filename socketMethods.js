'use strict';

import huejay from 'huejay';

import config from './config/hueConfig.js';

const client = new huejay.Client(config.hueConfig);

const methods = {
	'getAllLightStatus':(message,ws)=>{
		return client.lights.getAll()
		.then(lights =>{
			ws.send(JSON.stringify(lights));
		})

	},
	'getLightStatus': (message,ws)=>{
		return client.lights.getById(parseInt(message.lightId))
		.then(light=>{
			ws.send(JSON.stringify(light));
		})
	},
	'setLightState':(message,ws)=>{
		return client.lights.getById(parseInt(message.lightId))
		.then(light=>{
			Object.assign(light, message.data);
			return client.lights.save(light).then(light=>{
				ws.send(JSON.stringify(light));
			});
		});
	}
}

module.exports = methods;