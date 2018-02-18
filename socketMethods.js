'use strict';

import huejay from 'huejay';

import config from './config/hueConfig.js';

const client = new huejay.Client(config.hueConfig);


const methods = {
	'getLightStatus': (message,ws)=>{
		if(message.method ==='getLightStatus'){
			client.lights.getById(parseInt(message.data.lightId))
			.then(light=>{
				ws.send(JSON.stringify(light));
			})
		}
	},
	'setLightState':(message,ws)=>{
		client.lights.getById(parseInt(message.data.lightId))
		.then(light=>{
			light.on = message.data.on;
			console.log(light);
			return client.lights.save(light);
		})
		.catch(error => {
		    console.log('Could not find light');
		    console.log(error.stack);
		});
	}
}

module.exports = methods;