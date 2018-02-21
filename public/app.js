(() => {

  //Array of lights
  const lights = [];

  //
	const showMessage = (message) => {
    	messages.textContent += `\n${message}`;
    	messages.scrollTop = messages.scrollHeight;
 	};

	const ws = new WebSocket(`ws://${location.host}`);
  ws.onerror = () => showMessage('WebSocket error');
  ws.onopen = () => {
      showMessage('WebSocket connection established');
      sendData('getAllLightStatus',{});
    }
  ws.onclose = () => showMessage('WebSocket connection closed');
  ws.onmessage = (message)=> {
    showMessage(message.data);
    let data = JSON.parse(message.data);
    if(data.error){

    }
    else if(Array.isArray(data)){
      replaceLights(data);
    }
    else{
      updateLight(data);
    }
    updateShapes();
  }
  const updateShapes = ()=>{
      let el = document.getElementById('lightShapes');
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
      lights.forEach(light=>{
        let shape = document.createElement('div');
        let text = document.createElement('p');
        text.innerHTML = light.attributes.attributes.name;
        let hue = parseInt(((parseInt(light.state.attributes.hue)*360)/65536));
        let saturation = parseInt(((parseInt(light.state.attributes.sat)*100)/256));
        let brightness = parseInt(((parseInt(light.state.attributes.bri)*0)/256));
        shape.setAttribute('class','lightBlock');
        shape.setAttribute('style',"background-color: hsl("+String(hue)+", "+saturation+"%, "+"50"+"%)");
        shape.append(text);
        el.append(shape);
      })
  }
  const replaceLights = (newLights)=>{
    while (lights.length>0) {
      lights.pop();
    }
    newLights.forEach(light=>{
        lights.push(light);
    });
    updateIds("lightIds");
  }

  const updateLight = (light)=>{
    let id = parseInt(light.attributes.attributes.id);
    lights[id-1] = light;
  }

  const updateIds = (elementId)=>{
      let myNode = document.getElementById(elementId)
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
      }
      lights.forEach(light=>{
        let el = document.createElement('option');
        let val = light.attributes.attributes.id;
        el.value = val;
        el.text = val + " - "+light.attributes.attributes.name;
        
        myNode.append(el);
      });
  }

  const sendData = (method,data)=>{
      let id = document.querySelector('#lightIds').value;
      ws.send(JSON.stringify(
        {
          method:method,
          lightId: id,
          data: data
        }
      ));
  };
  //button functions

  document.querySelector('#getStatusButton').onclick =()=>{
      sendData('getLightStatus',{});
  };
  document.querySelector('#setLightBlueButton').onclick = () =>{
      sendData('setLightState',{
            brightness : 254,
            hue        : 45000,
            saturation : 254
          }
      );

  };
  document.querySelector('#setLightRedButton').onclick = () =>{
    sendData('setLightState',{
            brightness : 254,
            hue        : 65000,
            saturation : 254
          }
    );

  };
  document.querySelector('#setLightWhiteButton').onclick = () =>{
    sendData('setLightState',{
            brightness : 254,
            saturation : 0
        }
      );
  };
  document.querySelector('#setLightGreenButton').onclick = () =>{
    sendData('setLightState',{
            brightness : 254,
            hue        : 24000,
            saturation : 254,
          
        }
    );

  };
  document.querySelector('#setLightLavButton').onclick = () =>{
    sendData('setLightState',{
            brightness : 190,
            hue        : 49000,
            saturation : 98,
        }
    );

  };
  document.querySelector('#setLightStateButtonOn').onclick = () =>{ 
    sendData('setLightState',{
            on : true
        }
    );
  };
  document.querySelector('#setLightStateButtonOff').onclick = () =>{ 
    sendData('setLightState',{
            on : false
  
        }
    );
  };
  document.querySelector('#getAllLightStatusButton').onclick = () =>{ 
    sendData('getAllLightStatus',{
  
        }
    );
  };

})();