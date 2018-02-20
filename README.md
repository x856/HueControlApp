

Hue Web App

A web application to control hue lights.

Prerequisites

node.js - Im using version v6.11.3
A configured hue bridge with a user already created. In the future you will just need the bridge and the application will be able to add a user for itself.

Installing

	npm install

make a config hue config file (./config/hueConfig.js)

Statrting the application

	npm start

To run the application as a daemon:

	forever start dist/index.js

Then open a web browser and go to http://localhost:3000/

Randon notes

hueLight.js is currently not used at all.

The entire front end is really just a proof of concept. Any of the Hue light state parameters can be sent to the web socket api. 


