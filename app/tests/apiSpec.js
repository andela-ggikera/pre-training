// jasmine test for the Rest API
var frisby = require('express');

frisby.create('Get access token').get('http://localhost:8080/api')