var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SimpleSchema = new Schema({
	name : String,
	default: ''
});

module.exports = mongoose.model('Simple', SimpleSchema);