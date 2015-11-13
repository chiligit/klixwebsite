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
			if (req.method == 'POST') {
					console.log(req.body);
					saveFormData(app,'contact_us',req.body);
			} else {
			  res.render('index');
			}
        },

        plan: function(req, res){
            res.render('plan');
        }

    };
    return globalController;
}