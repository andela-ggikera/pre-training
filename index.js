var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var simple_api = require('./routes/simpleApi');
var routes = require('./routes/routes');

var app = express();
app.set('port', (process.env.PORT || 8000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', simple_api);
app.use('*', routes);

var server = app.listen(app.get('port'), function() {
	console.log("Listening for connections on port 8000 ....");
})