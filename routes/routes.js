module.exports = function(app){
    var global = app.controllers.global;

    app.get('/', global.index);
    app.get('/index', global.index);
    app.get('/plan', global.plan);
    app.get('/plan:type', global.plan);


    app.post('/index' , global.index);
}