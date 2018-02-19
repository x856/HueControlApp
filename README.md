

Hue Web App

A web application to control hue lights. 

Prerequisites

node.js - Im using version v6.11.3
A configured hue bridge with a user already created. In the future you will just need the bridge and the application will be able to add a user for itself.

Installing

make a config directory (./config) and hue config file 

./config/hueConfig.js

let config = {
	hueConfig : {
	  host:     'BRIDGE_IP',
	  timeout:  15000,
	  username:'HUE_USER'
	}
}
module.exports = config;

Then

npm install
npm start



