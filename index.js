var express = require('express');
var path = require('path');
var i18n = require('i18n');
var load = require('express-load');
var ECT = require('ect');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var mongoose = require('mongoose');
var config = require('./config/config.json');
global.config = config;

mongoose.connect(config.mongodbUriString);
i18n.configure({
    locales:['en', 'hu'],
    directory: __dirname + '/locales',
	cookie: 'lang',
	updateFiles: false
});

var app = express();
var ectRenderer = ECT({ watch: true, root: __dirname + '/views', ext : '.ect' });
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(i18n.init);

app.use('/css',express.static(path.join(__dirname, 'assets/css')));
app.use('/fonts',express.static(path.join(__dirname, 'assets/fonts')));
app.use('/img',express.static(path.join(__dirname, 'assets/img')));
app.use('/js',express.static(path.join(__dirname, 'assets/js')));
app.use('/lib',express.static(path.join(__dirname, 'assets/lib')));

app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);

load('services').then('models').then('controllers').then('routes').into(app);

app.listen(3000);
console.log('Listening on port 3000');