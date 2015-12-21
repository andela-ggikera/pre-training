// packages we going to use
var express = require('express');
var mongoose = require('../app/models/simple');
// get the model to describe the mongodb collection
var Simple = mongoose.model('Simple');
// instance of express router
var router = express.Router();

// middleware to log stuff and validate requests
router.use(function (request, response, next) {
    // log it
    console.log('Accessing the RESTful api ...');
    next();
});

// RESTful API
router.route('/simple')
    // POST a name to the collection
    .post(function (request, response) {
        // new instance of the simple model
        var simple = new Simple();
        simple.name = request.body.name;
        simple.speak_your_mind = request.body.speak_your_mind;

        // save the model and handle any errors
        simple.save(function (err) {
            if (err) {
                response.send('ERROR: ', err)
            }
            response.json({ message : 'CREATOR: Successfully added the name to the database!'})
        })
    });

// GET all the names from the model
router.route('/simple').get(function (req,res) {
    Simple.find(function(err, simples) {
        if (err) {
            res.json({ message: 'Ooops: Could not retrieve names!'});
        }
        res.json(simples);
    });
});

// PUT: update a given name associated to the id
router.route('/simple').put(function (req, res) {
	var id = req.body._id;
    Simple.update({ _id: id },
    {
    	$set: {
    		name: req.body.name,
    		speak_your_mind: req.body.speak_your_mind
    	}
    },
    function (err) {
     	if (err) {
      		res.status(500).send({
        		error: 'Could not update the user'
      		});
    	} else {
      		res.status(200).send({
        		message: 'Updated Successfully'
      		});
    	}
    });
});
// GET: one name associated to this id from the model
router.route('/simple/:simple_id')
    .get(function (req, res) {
        Simple.findById(req.params.simple_id, function (err, simple) {
            if (err) {
                res.send({message: 'Oops: unable to get the name'});
            }
            res.json(simple);
        });
    })

    // DELETE: allow deletion of names
    .delete(function (req, res) {
        Simple.remove({
            _id: req.params.simple_id
        }, function(err, name) {
            if (err) {
                res.send({ message: 'Ooops: Unable to delete the name' })
            }
            res.json({ message: 'Successfully deleted it'});
        });
    });

module.exports = router;