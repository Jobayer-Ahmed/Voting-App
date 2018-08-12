// Dependencies
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Creating app
const app = express();

// Env variables
dotenv.config({verbose: true});

// connect to mongodb
mongoose.connect('mongodb://mickeyvai:Jobayer29@ds135963.mlab.com:35963/fcc-voting-apps', (err) => {
	if (err) throw err;
})

// Express middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // "*" for public access and www.example.com for specific uses
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', require('./routes/register'));

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('App is running on port ' + port);
});