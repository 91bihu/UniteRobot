module.exports = {
    router: function(router) {
        /* GET home page. */
        router.get('/Home', function(req, res, next) {
            res.render('Home/index', {
                token: req.session.token
            });
        });
        router.get('/Home/welcome', function(req, res, next) {
            res.render('Home/welcome');
        });
    }
};