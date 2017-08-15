var express = require('express');
var ejs = require('ejs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require("express-session");


var main = require('./routes/main');

var app = express();

//设置端口
app.set("port", 8000);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.engine('html', ejs.__express);
app.set('view engine', 'html');

// app.listen(8000);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'resource')));
app.use(express.static(path.join(__dirname, 'config')));
app.use(express.static(path.join(__dirname, 'operationDB')));
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, "webconfig")));
app.use(express.static(path.join(__dirname, "extends")));
app.use(express.static(path.join(__dirname, "model")));
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


//
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));


//登录拦截器
app.use(function(req, res, next) {
    var url = req.originalUrl;
    if (url != "/login" && url != "/" && !req.session.user) {
        return res.redirect("/");
    } else if (req.session.user && url == "/signOut") { //退出
        req.session = null;
        return res.redirect("/");
    }
    next();
});

//入口
app.use('/', main);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('Error/error');
});
module.exports = app;