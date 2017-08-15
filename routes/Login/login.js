var login = require("../../client/Login/login");
module.exports = {
    router: function(router) {
        //login
        router.get('/', function(req, res, next) {
            res.render('Login/index');
        });
        router.post('/login', function(req, res, next) {
            login.login(req, res, next);
        });
    }
};