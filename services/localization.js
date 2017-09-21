module.exports = function(app){
	var i18n = require('i18n');
	i18n.configure({
		locales:['en', 'hu'],
		directory: __dirname + '/../locales',
		cookie: 'lang',
		updateFiles: false
	});
	app.use(i18n.init);
	i18n.setLocale('hu');
	global.i18n = i18n;
	console.log(i18n.__('site.title'));
}