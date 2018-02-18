(() => {
	const getStatusButton = document.querySelector('#getStatusButton');
	const setLightStateButton = document.querySelector('#setLightStateButton');
  
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
  ws.onopen = () => showMessage('WebSocket connection established');
  ws.onclose = () => showMessage('WebSocket connection closed');
  ws.onmessage = (message)=> showMessage(message.data);
  getStatusButton.onclick =()=>{
      let id = document.querySelector('#lightId').value;
      ws.send(JSON.stringify(
        {
          method:'getLightStatus',
          data:{
            lightId: id
          }
        }
      ));
  };
  setLightStateButton.onclick = ()=>{ 
    let id = document.querySelector('#lightId').value;
    let on = document.querySelector('#lightState').value;
    ws.send(JSON.stringify(
        {
          method:'setLightState',
          data:{
            lightId: id,
            on : on
          }
        }
      ));
  }

})();