const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

// Connect to the MongoDB
mongoose.connect('mongodb://localhost:27017/fullcycle',{useNewUrlParser : true});

// Create Express application
const app = module.exports = express();

const NODE_ENV = 'development';
//Set constiables
app.set('env', process.env.NODE_ENV || 'production');
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

routes = require('./routes/index')
app.use('/api', routes);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Use environment defined port or 4000
const port = process.env.PORT || 3001;

// Start the server
app.listen(port);
console.log('App Running on port ' + port);
