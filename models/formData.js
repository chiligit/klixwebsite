module.exports = function(app){
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var formDataSchema = new Schema({
		type: String,
		name: String,
		email: String,
		phone: String,
		message: String,
	});
	var FormData = mongoose.model('FomData', formDataSchema )

	return FormData;
}