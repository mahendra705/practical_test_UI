// server.js

// set up ========================
var express = require('express');
var app = express();            // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)

app.use(express.static(__dirname + '/public'));                 // set the static files location /public for users

app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json 

// listen (start app with node server.js) ======================================
app.listen(3000);
console.log("App listening on port 3000");

