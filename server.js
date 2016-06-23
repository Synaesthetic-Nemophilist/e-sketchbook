
//setup=========================================================================
var express = require('express');
var app = express();  // create app w/ express
var mongoose = require('mongoose');  // mongoose for mongoDB
var morgan = require('morgan');  // log requests to the console (express4)
var bodyParser = require('body-parser');  // all info from html POST (exp4)
var methodOverride = require('method-override');  // simulate DELETE and PUT (exp4)

//configuration=================================================================
// load the config
var database = require('./config/database');
mongoose.connect(database.url);     // connect to mongoDB database on mlab

app.use(express.static(__dirname + '/public'));  // serve static files in that dir
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


// load the routes  ============================================================
require('./app/routes')(app);


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
