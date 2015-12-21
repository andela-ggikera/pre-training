var express = require('express');
var router = express.Router();

// configure angular routes
router.get('*', function(request, response) {
	response.sendfile('../public/views/index.html');
});

module.exports = router;