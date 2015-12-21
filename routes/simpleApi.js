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
router.route('/simple/:name')
    // POST a name to the collection
    .post(function (request, response) {
        // new instance of the simple model
        var simple = new Simple();
        simple.name = request.params.name;

        // save the model and handle any errors
        simple.save(function (err) {
            if (err) {
                response.send('ERROR: ', err)
            }
            response.json({ message : 'CREATOR: Successfully added the name to the database!'})
        })
    });

// GET all the names from the model
router.route('/simple')
    .get(function (req,res) {
        Simple.find(function(err, simples) {
            if (err) {
                res.json({ message: 'Ooops: Could not retrieve names!'});
            }
            res.json(simples);
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

    // PUT: update a given name associated to the id
    .put(function (req, res) {
        Simple.findById(req.params.simple_id, function (err, simple) {
            if (err) {
                res.send(err);
            }
            simple.save(function (err) {
                if (err) {
                    res.send({ message: 'Oops: Unable to edit the name'});
                }
                res.json({ message: 'PUTTER: Simple collection has been updated' });
            })
        })
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