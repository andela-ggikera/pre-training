var mongoose = require('mongoose');
var dbURI = "mongodb://andela:learn@ds027155.mongolab.com:27155/pre-training"
mongoose.connect(dbURI);
// log connection
var db = mongoose.connection;

db.on('connecting', function() {
    console.log('connecting');
});
db.on('connected', function() {
    console.log('connected!');
});
db.once('open', function() {
    console.log('connection open');
});
db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});

db.on('error', console.error.bind(console, 'connection.error'));

db.on('reconnected', function () {
    console.log('reconnected');
});
db.on('disconnected', function() {
    console.log('disconnected');
    console.log('dbURI is: '+dbURI);
    mongoose.connect(dbURI,
      {server: {auto_reconnect:true,
      socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }},
      replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }});
});

console.log('dbURI is: '+dbURI);
mongoose.model('Simple', {
    name : { type : String, default: '', required: true}
});

// export mongoose to main server script
module.exports = mongoose;
