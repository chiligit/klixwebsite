module.exports = function(app){
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var formDataSchema = new Schema({
		type: String,
		name: String,
		email: String,
		phone: String,
		message: String,
		date : {
			type : Date,
			default : Date.now
		  }
	});
	var FormData = mongoose.model('FormData', formDataSchema )

	return FormData;
}