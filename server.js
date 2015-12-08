// packages we going to use
var express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose');
var Simple = require('./app/models/simple');

// configurations
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/pre-training');

// set port to use
var port = process.env.PORT || 8080;

// instance of express router
var router = express.Router();

// middleware to log stuff and validate requests
router.use(function(request, response, next) {
	// log it
	console.log('Accessing the RESTful api ...');
	next();
});

router.get('/', function(request, response) {
	response.json({ message: 'Welcome to the simple RESTful Api!'});
});

// RESTful API
router.route('/simple')
	// POST
	.post(function(request, response) {
		// new instance of the simple model
		var simple = new Simple();
		simple.name = request.body.name;

		// save the model and handle any errors
		simple.save(function(err) {
			if (err) {
				response.send('ERROR: ', err)
			}
			response.json({ message : 'CREATOR: Creation was a success!'})
		})
	})
	.get(function(req,res) {
			Simple.find(function(err, simples) {
				if (err) {
					res.send(err);
				}
				res.send(simples);
			});
	 });
// GET: the name associated to this id
router.route('/simple/:simple_id')
	.get(function(req, res) {
		Simple.findById(req.params.simple_id, function(err, simple) {
			if (err) {
				res.send(err);
			}
			res.json(simple);
		});
	})

	// PUT: update the simple
	.put(function(req, res) {
		Simple.findById(req.params.simple_id, function(err, simple) {
			if (err) {
				res.send(err);
			}
			simple.save(function(err) {
				if (err) {
					res.send(err);
				}
				res.json({ message: 'PUTTER: Simple collection has been updated' });
			})
		})
	})
	// DELETE: allow deletion of names
	.delete(function(req, res) {
		Simple.remove({
			_id: req.params.simple_id
		}, function(err, name) {
			if (err) {
				res.send(err)
			}
			res.json({ message: 'Successfully deleted it'});
		});
	});

// register our routes for '/api' only
app.use('/api', router);

// server listens on predefined port
app.listen(port);
console.log("Listening on port: " + port);