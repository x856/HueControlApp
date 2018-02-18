'use strict';


import express from 'express';

import path from 'path';

import morgan from 'morgan';

const app = express();

if (app.get('env') == 'production') {
	app.use(morgan('common', { 
		skip: (req, res)=> { 
			return res.statusCode < 400 
  		}, 
  		stream: path.join(__dirname , './morgan.log' )
 	}));
} 
else {
  app.use(morgan('dev'));
}

app.use(express.static(path.join(__dirname, './public')));

module.exports = app;


