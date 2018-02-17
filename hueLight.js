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
}

