'use strict';

var express = require('express');
var containers = {};

var scraperApp = require('./scraper/default.controller')(containers);

var app = new express();
var routes = new express.Router();

routes.use([''], scraperApp);
app.use('', routes);
module.exports = routes;