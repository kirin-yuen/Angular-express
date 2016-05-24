var express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	morgan = require('morgan'), // log requests to the console (express4)
	bodyParser = require('body-parser'), // pull information from HTML POST (express4)
	methodOverride = require('method-override');

// connect to mongoDB database on modulus.io
var database = require('./config/database');
mongoose.connect(database.url);

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));
// log every request to the console
app.use(morgan('dev'));
// parse application/x-www-form-urlencoded            
app.use(bodyParser.urlencoded({'extended':'true'}));
// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());


require('./app/routes')(app);


app.listen(8080);
console.log('App listening on port 8080');