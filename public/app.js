(() => {
	const showMessage = (message) => {
    	messages.textContent += `\n${message}`;
    	messages.scrollTop = messages.scrollHeight;
 	};

  const handleResponse = (response) => {
    	return response.ok
      	? response.json().then((data) => JSON.stringify(data, null, 2))
      	: Promise.reject(new Error('Unexpected response'));
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
    if(Array.isArray(data)){
      clearIds();
      let myNode = document.getElementById("lightIds")
      for (let x = 0;x<data.length;x++){
        let val = x+1;
        let el = document.createElement('option');
        el.value = val;
        el.text = String(val);
        myNode.append(el);

      }

    }
    

  }

  const clearIds = ()=>{
    let myNode = document.getElementById("lightIds");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
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