var mongoose = require('mongoose');
mongoose.connect("mongodb://andela:learn@ds027155.mongolab.com:27155/pre-training");
// log connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection.error'));

mongoose.connect('connected', function() {
    console.log("connection established successfully");
});
mongoose.model('Simple', {
    name : { type : String, default: ''}
});

// export mongoose to main server script
module.exports = mongoose;
