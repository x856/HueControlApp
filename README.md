

Hue Web App

A web application to control hue lights. 

Prerequisites

node.js - Im using version v6.11.3
A configured hue bridge with a user already created. In the future you will just need the bridge and the application will be able to add a user for itself.

Installing

npm install

make a config directory (./config) and hue config file 

./config/hueConfig.js

let config = {
	hueConfig : {
	  host:     'Hue_BRIDGE_IP',
	  timeout:  15000,
	  username:'HUE_USER'
	}
}
module.exports = config;

Statrting the application

npm start


Randon notes

hueLight.js is currently not used at all.



