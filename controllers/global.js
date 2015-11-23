module.exports = function(app){
	var http = require('http');
	var Q = require('q');
	var async = require('async');

	var saveFormData = function(app, type, params){
		
		var saveData = function(done){
			console.log(params);
				var newFormData = app.models.formData({
					type: type,
					name: params.name,
					phone: params.phone,
					email: params.email,
					message: params.message
				}).save(function(err) {
					console.log("save");
					if (err) {
						throw err;	
						console.log(err);
						done(err);
					}
					console.log('FormData created!');
					done(null,'FormData created!');
				}).then(done(null,'FormData created!'));	
		};
		return Q.nfcall(saveData);
	};
	
	var sendMail = function(app,type,params) {
		
		var send = function(done) {
			console.log('mail');
			var mailString = "Típus: "+type+"\n"+"Név: "+params.name+ "\n" + "Telefonszám: "+params.phone+"\n"+"Email cím: "+params.email+" \n"+ "Üzenet: "+params.message;
			app.services.mail.sendMail({
				to: config.user,
				subject: 'Kapcsolatfelvétel',
				text: mailString
			},function(error, info){
				if(error){
					console.log('--------------------');
					console.log(error);
					console.log('--------------------');
					done(error);
				} else {
					console.log(mailString);
					console.log('Message sent: ' + info.response);
					done(null,'sent');	
				}
			});		
		}
		return Q.nfcall(send);
	};

	var postCall = function(req,res,package) {
		async.waterfall([
				function(doneA) {
					sendMail(app,package,req.body).then(function(response) {
							console.log('doneA elott');
							doneA(null, response);
						})
						.catch(doneA);
				},
				function(response, doneB) {
					saveFormData(app,package,req.body).then(function(response) {
							console.log('doneB elott');
							doneB(null, response);
						})
						.catch(doneB);
				}
			], function(err) {
				if (!err) {
					console.log('waterfall-no-err');
					console.log("promiseOK");
					var response = res.__("form.response.success");
					res.send(res.__("form.response.success"));
					res.status(200).end(http.STATUS_CODES[200]);
				} else {
					console.log('waterfall-err');
					var response = res.__("form.response.fail");
					res.send(res.__("form.response.fail"));
					res.status(500).end(http.STATUS_CODES[500]);
				}
			});	
	};

	
    var globalController = {
        index: function(req, res){
			if (req.method == 'POST') {
					postCall(req,res,'contact_us');
			} else {
			  res.render('index');
			}
        },

        plan: function(req, res){
			if ((req.query.package != undefined) && ("package."+req.query.package+".id" != res.__("package."+req.query.package+".id"))) {
		
				if (req.method == 'POST') {
						postCall(req, res, 'package:'+req.query.package);
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