module.exports = function(app){
	var session = require('express-session');
	var RedisStore = require('connect-redis')(session);
	var redis = require('redis');
	var client = redis.createClient();

	var redisStore = new RedisStore({ host: config.redis.host, port: config.redis.port});
	//console.log(redisStore);

	app.use(session({
		secret: "kqsdjfmlksdhfhzirzeoibrzecrbzuzefcuercazeafxzeokwdfzeijfxceriga",
		store: redisStore,
		resave: false,
		saveUninitialized: true,
		cookie: { 
			maxAge: config.redis.cookieMaxAge
		} 
	}));
	app.use(function (req, res, next) {
		req.session['lang'] = req.getLocale();
		next();
	});
	return;
}

