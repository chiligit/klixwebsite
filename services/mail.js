module.exports = function(app){
	var nodemailer = require('nodemailer');
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: config.user,
			pass: process.env.pass
		}
	}, {
		// default values for sendMail method
		from: config.user,
	});
	global.mailer = transporter;
	return transporter;
}