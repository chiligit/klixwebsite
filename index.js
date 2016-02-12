var express = require('express');
var path = require('path');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var ncp = require('ncp').ncp;
var favicon = require('serve-favicon');

var config = require('./config/config.json');
global.config = config;

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.use('/css',express.static(path.join(__dirname, 'assets/css')));
app.use('/fonts',express.static(path.join(__dirname, 'assets/fonts')));
app.use('/img',express.static(path.join(__dirname, 'assets/img')));
app.use('/js',express.static(path.join(__dirname, 'assets/js')));
app.use('/lib',express.static(path.join(__dirname, 'assets/lib')));

app.use(favicon(__dirname + '/assets/img/favicon.ico'));

load('services').then('models').then('controllers').then('routes').into(app);

ncp('assets', 'shared', function (err) {
 if (err) {
   return console.error(err);
 }
 console.log('Assets shared!');
});

app.listen(3000);
console.log('Listening on port 3000');