module.exports = function(app){
	var mongoose = require('mongoose');
	mongoose.connect(config.mongodbUriString);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		   console.log('Connected to MongoDB');
		   return;
	});
	mongoose.set('debug', true);
	return;

}