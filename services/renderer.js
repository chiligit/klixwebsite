module.exports = function(app){
	var ECT = require('ect');
	var ectRenderer = ECT({ watch: true, root: __dirname + '/../views', ext : '.ect' });
	app.set('view engine', 'ect');
	app.engine('ect', ectRenderer.render);
	return;
}