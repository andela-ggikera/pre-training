// packages we going to use
var express = require('express'),
		app = express(),
		bodyParser = require('body-parser');

var mongoose = require('./app/models/simple');
// get the model to describe the mongodb collection
var Simple = mongoose.model('Simple');

// configurations
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

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
	response.sendfile('app/views/index.html');
});

// RESTful API
router.route('/simple/:name')
	// POST a name to the collection
	.post(function(request, response) {
		// new instance of the simple model
		var simple = new Simple();
		simple.name = request.params.name;

		// save the model and handle any errors
		simple.save(function(err) {
			if (err) {
				response.send('ERROR: ', err)
			}
			response.json({ message : 'CREATOR: Successfully added the name to the database!'})
		})
	});

	// GET all the names from the model
	router.route('/simple').get(function(req,res) {
			Simple.find(function(err, simples) {
				if (err) {
					res.json({ message: "Could not retrieve names!"});
				}
				res.json(simples);
			});
	 });
// GET: one name associated to this id from the model
router.route('/simple/:simple_id')
	.get(function(req, res) {
		Simple.findById(req.params.simple_id, function(err, simple) {
			if (err) {
				res.send(err);
			}
			res.json(simple);
		});
	})

	// PUT: update a given name associated to the id
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
