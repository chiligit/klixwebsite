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
				console.log('formData created!');
			});	
		
	}

    var globalController = {
        index: function(req, res){
			console.log("Cookies: ", req.cookies)
			if (req.method == 'POST') {
					saveFormData(app,'contact_us',req.body);
			} else {
			  res.render('index');
			}
        },

        plan: function(req, res){
			if (req.method == 'POST') {
					console.log(req.body);
					saveFormData(app,'contact_us',req.body);
			} else {
				console.log(req.query.package);
				console.log("package."+req.query.package+".id");
				console.log(res.__("package."+req.query.package+".id"));
				if ((req.query.package != undefined) && ("package."+req.query.package+".id" != res.__("package."+req.query.package+".id"))) {
					var data = { package : req.query.package };
					res.render('plan', data);	
				}
				else {
					res.render('index');
				}
			
			}
        }

    };
    return globalController;
}