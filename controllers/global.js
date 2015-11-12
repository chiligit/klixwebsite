module.exports = function(app){

    var globalController = {
        index: function(req, res){
			if (req.method == 'POST') {
					console.log( 'fasza' );
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