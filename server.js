
//setup=========================================================================
var express = require('express');
var app = express();  // create app w/ express
var mongoose = require('mongoose');  // mongoose for mongoDB
var morgan = require('morgan');  // log requests to the console (express4)
var bodyParser = require('body-parser');  // all info from html POST (exp4)
var methodOverride = require('method-override');  // simulate DELETE and PUT (exp4)

//configuration=================================================================
mongoose.connect('mongodb://SynNemo:synny@ds021034.mlab.com:21034/hungrynemo');  // conn to mongodb on mlab

app.use(express.static(__dirname + '/public'));  // serve static files in that dir
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


 //define model =================================================================
var Todo = mongoose.model('Todo', {
    text : String  // just a string, mongo automatically adds ids
});


// routes ======================================================================

// THE API ---------------------------------------------------------------------
// GET all todos
app.get('/api/todos', function(req, res) { //GET method of api is available @ /api/todos route

    // use mongoose to get all todos in the database
    Todo.find(function(err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(todos); // return all todos in JSON format
    });
});

// POST todo and send back all todos after creation
app.post('/api/todos', function(req, res) {

    // create a todo, information comes from AJAX request from Angular
    Todo.create({
        text : req.body.text,
        done : false
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});

// DELETE a todo
app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you del another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});


// application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });




// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");