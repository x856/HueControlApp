(() => {
	const getStatusButton = document.querySelector('#getStatusButton');
  const setLightStateButtonOn = document.querySelector('#setLightStateButtonOn');
  const setLightStateButtonOff = document.querySelector('#setLightStateButtonOff');
	const setLightStateBlue = document.querySelector('#setLightBlueButton');
  const setLightStateRed = document.querySelector('#setLightRedButton');
  const setLightStateWhite = document.querySelector('#setLightWhiteButton');
  const setLightStateGreen = document.querySelector('#setLightGreenButton');
  const setLightStateLav = document.querySelector('#setLightLavButton');

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
          lightId: id,
          data:{
          }
        }
      ));
  };
  setLightStateBlue.onclick = () =>{
    let id = document.querySelector('#lightId').value;
    ws.send(JSON.stringify(
        {
          method:'setLightState',
          lightId: id,
          data:{
            brightness : 254,
            hue        : 45000,
            saturation : 254,
          }
        }
      ));

  };
  setLightStateRed.onclick = () =>{
    let id = document.querySelector('#lightId').value;
    ws.send(JSON.stringify(
        {
          method:'setLightState',
          lightId: id,
          data:{
            brightness : 254,
            hue        : 65000,
            saturation : 254,
          }
        }
      ));

  };
  setLightStateWhite.onclick = () =>{
    let id = document.querySelector('#lightId').value;
    ws.send(JSON.stringify(
        {
          method:'setLightState',
          lightId: id,
          data:{
            brightness : 254,
            saturation : 0,
          }
        }
      ));
  };
  setLightStateGreen.onclick = () =>{
    let id = document.querySelector('#lightId').value;
    ws.send(JSON.stringify(
        {
          method:'setLightState',
          lightId: id,
          data:{
            brightness : 254,
            hue        : 24000,
            saturation : 254,
          }
        }
      ));

  };
  setLightStateLav.onclick = () =>{
    let id = document.querySelector('#lightId').value;
    ws.send(JSON.stringify(
        {
          method:'setLightState',
          lightId: id,
          data:{
            brightness : 190,
            hue        : 49000,
            saturation : 98,
          }
        }
      ));

  };
  setLightStateButtonOn.onclick = () =>{ 
    let id = document.querySelector('#lightId').value;
    ws.send(JSON.stringify(
        {
          method:'setLightState',
          lightId: id,
          data:{
            on : true
          }
        }
      ));
  };
  setLightStateButtonOff.onclick = () =>{ 
    let id = document.querySelector('#lightId').value;
    ws.send(JSON.stringify(
        {
          method:'setLightState',
          lightId: id,
          data:{
            on : false
          }
        }
      ));
  };
})();