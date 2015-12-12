// jasmine test for the Rest API
var frisby = require('frisby');

frisby.create('GET: Request all the names from collection')
  .get('http://localhost:8080/api/simple')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON('0', {
    	_id: function(val) { expect(val).toMatchOrBeNull("566c312ce7909fad0719e3e1") },
    	__v: 0,
    	name: function(val) { expect(val).toMatchOrBeNull("Becky Burner") }, // Custom matcher callback
    })
    .expectJSONTypes('0', {
    	_id: String,
	    name: function(val) { expect(val).toBeTypeOrNull(String); }, // Custom matcher callback
	  })

frisby.create('GET: Request a given name from collection')
  .get('http://localhost:8080/api/simple/566c312ce7909fad0719e3e1')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON('0', {
    	_id: function(val) { expect(val).toMatchOrBeNull("566c312ce7909fad0719e3e1") },
    	__v: 0,
    	name: "Becky Burner"
    })
    .expectJSONTypes('0', {
    	_id: String,
	    name: function(val) { expect(val).toBeTypeOrNull(String); }, // Custom matcher callback
	  })

frisby.create('POST: Add a new name to collection')
	.post('http://localhost:8080/api/simple/Jee Githinji Gikera')
		.expectStatus(200)
		.expectHeaderContains('content-type', 'application/json')
		.expectJSON({
    	message: function(val) { expect(val).toMatchOrBeNull(String); },
    })
		.expectJSONTypes({
	    message: function(val) { expect(val).toBeTypeOrNull(String); }, // Custom matcher callback
	  })

frisby.create('PUT: Edit a given name in the collection')
	.put('http://localhost:8080/api/simple/566c312ce7909fad0719e3e1')
		.expectStatus(200)
		.expectHeaderContains('content-type', 'application/json')
		.expectJSON({
    	message: function(val) { expect(val).toMatchOrBeNull(String); },
    })
		.expectJSONTypes({
	    message : function(val) { expect(val).toBeTypeOrNull(String); }, // Custom matcher callback
	  })

frisby.create('DELETE: a given name from the collection')
	.delete('http://localhost:8080/api/simple/566c2df734c9b23207f63c94')
		.expectStatus(200)
		.expectHeaderContains('content-type', 'application/json')
		.expectJSON({
    	message: function(val) { expect(val).toMatchOrBeNull('Successfully deleted it') },
    })
		.expectJSONTypes({
	    message : function(val) { expect(val).toBeTypeOrNull(String); }, // Custom matcher callback
	  })
.toss();


