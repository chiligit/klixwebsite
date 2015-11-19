module.exports = function(app){

	var saveFormData = function(app, type, params){
		console.log(params);
			var newFormData = app.models.formData({
				type: type,
				name: params.name,
				phone: params.phone,
				email: params.email,
				message: params.message
			}); 
			newFormData.save(function(err) {
				if (err) throw err;
				console.log('FormData created!');
			});	
			var mailString = "Típus: "+type+"\n"+"Név: "+params.name+ "\n" + "Telefonszám: "+params.phone+"\n"+"Email cím: "+params.email+" \n"+ "Üzenet: "+params.message;
			app.services.mail.sendMail({
				to: config.user,
				subject: 'Kapcsolatfelvétel',
				text: mailString
			},function(error, info){
				if(error){
					return console.log(error);
				}
				console.log(mailString);
				console.log('Message sent: ' + info.response);
			});
	}

    var globalController = {
        index: function(req, res){
			if (req.method == 'POST') {
					saveFormData(app,'contact_us',req.body);
			} else {
			  res.render('index');
			}
        },

        plan: function(req, res){
			if ((req.query.package != undefined) && ("package."+req.query.package+".id" != res.__("package."+req.query.package+".id"))) {

				if (req.method == 'POST') {
						saveFormData(app,'package:'+req.query.package,req.body);
				} else {
						var data = { package : req.query.package };
						res.render('plan', data);	
				}
			}
			else{
					res.redirect('/');
			}
        }

    };
    return globalController;
}