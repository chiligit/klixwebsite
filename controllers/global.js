module.exports = function(app){
	var http = require('http');
	var Q = require('q');
	var async = require('async');

	var saveFormData = function(app, type, params){
		
		var saveData = function(done){
				console.log('DB:');
				var newFormData = app.models.formData({
					type: type,
					name: params.name,
					phone: params.phone,
					email: params.email,
					message: params.message,
				}).save(function(err) {
					if (err) {
						throw err;	
						console.log(err);
						done(err);
					} else {
						console.log('FormData created!');
						done(null,'FormData created!');
					} 
				})	
		};
		return Q.nfcall(saveData);
	};
	
	var sendMail = function(app,type,params) {
		
		var send = function(done) {
			var mailString = "Típus: "+type+"\n"+"Név: "+params.name+ "\n" + "Telefonszám: "+params.phone+"\n"+"Email cím: "+params.email+" \n"+ "Üzenet: "+params.message;
			console.log('///////////////////');
			console.log(mailString);
			console.log('///////////////////');
			console.log('');
			console.log('mail:');
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
					console.log('Message sent: ' + info.response);
					done(null,'sent');	
				}
			});		
		}
		return Q.nfcall(send);
	};

	var sendCustomerResponse = function(app,type,params,res) {
		
		var send = function(done) {
			var mailString = res.__('customer.mail.response');
			var mailSubject = res.__('customer.mail.subject');
			console.log('///////////////////');
			console.log(res.__('customer.mail.response'));
			console.log('///////////////////');
			console.log('');
			console.log('mail:');
			app.services.mail.sendMail({
				to: params.email,
				subject: mailSubject,
				text: mailString
			},function(error, info){
				if(error){
					console.log('--------------------');
					console.log(error);
					console.log('--------------------');
					done(error);
				} else {
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
							doneA(null, response);
						})
						.catch(doneA);
				},
				function(response, doneB) {
					sendCustomerResponse(app,package,req.body,res).then(function(response) {
							doneB(null, response);
						})
						.catch(doneB);
				},
				function(response, doneC) {
					saveFormData(app,package,req.body).then(function(response) {
							doneC(null, response);
						})
						.catch(doneC);
				}
			], function(err) {
				if (!err) {
					var response = res.__("form.response.success");
					res.send(res.__("form.response.success"));
					res.status(200).end(http.STATUS_CODES[200]);
				} else {
					var response = res.__("form.response.fail");
					res.send(res.__("form.response.fail"));
					res.status(500).end(http.STATUS_CODES[500]);
				}
			});	
	};

	var logBadRequest = function(req, type, package) {
        console.log('--------------------');
        console.log('Bad request from IP:' + req.connection.remoteAddress);
        console.log('type: ' + type);
        if (type == 'plan') {
            console.log('package: ' + package);
		}
        console.log('required param values:');
        console.log('name: ' + req.body.name);
        console.log('phone: ' + req.body.phone);
        console.log('email: ' + req.body.email);
        console.log('message: ' + req.body.message);
        console.log('--------------------');
	}
	
    var globalController = {
        index: function(req, res){

			if (req.method == 'POST') {

				if (req.body.name != undefined  &&
                    req.body.phone != undefined  &&
                    req.body.email != undefined &&
                    req.body.message != undefined )
				{
                    postCall(req, res, 'contact_us');
                } else {
    				logBadRequest(req, 'contact_us', null);
    				res.render('index');
                }
			} else {
				res.render('index');
			}
        },

        plan: function(req, res){

            if ((req.query.package != undefined) &&
                ("package." + req.query.package + ".id" != res.__("package." + req.query.package + ".id"))) {

            	if (req.method == 'POST') {

                    if (req.body.name != undefined &&
                        req.body.phone != undefined &&
                        req.body.email != undefined &&
                        req.body.message != undefined)
                    {
                        postCall(req, res, 'package:'+req.query.package);
                    } else {
                        logBadRequest(req, 'plan', req.query.package);
                        res.render('index');
                    }
                } else {
                    var data = { package : req.query.package };
                    res.render('plan', data);
                }
			} else {
            	res.redirect('/');
			}


        }

    };
    return globalController;
}