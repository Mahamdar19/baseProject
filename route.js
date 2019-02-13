

'use strict';

const express = require('express');
const app = new express();

const userController = require('./modules/user/controller')();
const scraperController = require('./modules/scraper/default.controller')();
const tryController= require ('./modules/try/myController') ();
const friendsController= require('./modules/friends/controller') ();
const postController= require('./modules/post/controller') ();


const routes = new express.Router();

// routes.post("/login", function(req, res){
//     res.status(200).send({'msg POST' : 'I am Workign Fine'})
// });

// routes.get("/login", function(req, res){
//     res.status(200).send({'msg' : 'I am Workign Fine'})
// });


 routes.use(['/users'], userController);
 routes.use(['/scraper'], scraperController);
 routes.use(['/try'], tryController);
 routes.use(['/posts'], postController);
 
 

 
 

 app.use('', routes);

module.exports = routes;
