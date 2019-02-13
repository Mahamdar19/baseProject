'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const expValidator = require('express-validator');
const _ = require('lodash');
app.use(cors());


// Constants
require('dotenv').config()
const PORT = process.env.server_port || 8080;
const HOST = process.env.server_host || "0.0.0.0";


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//return 'mongodb://' + this.databaseHost + ':' + this.databasePort + '/' +this.databaseName



  /**
     * validator function for checkBody
      */

  function expressValidator() {
    return ({
      customValidators: {
        isArray: function (value) {
          return Array.isArray(value);
        },
        isArrayOfStrings: function (value) {
          if (!Array.isArray(value)) {
            return false;
          }
          if (value.length < 1) {
            return false;
          }

          const res = value.every(v => (typeof v === 'string'));

          return res;
        }
      }
    });
  } 

  app.use(expValidator(expressValidator()));


app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept, X-Requested-With, Session, Origin');
    next();
});


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect('mongodb://localhost/test-db', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  //console.log("h");
});

// mongoose.connect('mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;


const routes = require('./route');

app.use('/api/v1',routes);

app.options('*', cors());

app.listen(PORT, HOST);
console.log('Running on http://'+HOST+':'+PORT);

