'use strict';

class Light {
	constructor(apiConnector,id){
		this.apiConnector = apiConnector;
		this.id = id;
	}

	getStatus(){
		this.apiConnector.getById(this.id)
		.then(light => {
			console.log(light);
		})
		.catch(error => {
		    console.log('Could not find light');
		    console.log(error.stack);
		});
	}
	setLightState(data){
		this.apiConnector.getById(this.id)
		.then(light=>{
			light.on = data.on;
			return client.lights.save(light);
		})
		.catch(error => {
		    console.log('Could not find light');
		    console.log(error.stack);
		});
	}
}

