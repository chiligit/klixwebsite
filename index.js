var express = require('express');
var path = require('path');
var i18n = require('i18n');
var load = require('express-load');
var ECT = require('ect');

var app = express();
var ectRenderer = ECT({ watch: true, root: __dirname + '/views', ext : '.ect' });

i18n.configure({
    locales:['en', 'hu'],
    directory: __dirname + '/locales'
});
app.use(i18n.init);

app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);

load('models').then('controllers').then('routes').into(app);

app.use('/css',express.static(path.join(__dirname, 'assets/css')));
app.use('/fonts',express.static(path.join(__dirname, 'assets/fonts')));
app.use('/img',express.static(path.join(__dirname, 'assets/img')));
app.use('/js',express.static(path.join(__dirname, 'assets/js')));
app.use('/lib',express.static(path.join(__dirname, 'assets/lib')));

app.listen(3000);

console.log( i18n.__("site.title") );

console.log('Listening on port 3000');