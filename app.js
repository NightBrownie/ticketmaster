var express = require('express');
var swig = require('swig');
    swig.setDefaults({ varControls: ['[[', ']]'] });

var path = require('path');

//middlewares
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

//config values
var secret = require('./config/secret');

//root route
var routes = require('./routes/index');
//api controllers
var userRoutes = require('./routes/user');
var filmsRoutes = require('./routes/film');
var theaterRoutes = require('./routes/theater');
var eventRoutes = require('./routes/event');
var definitionsRoutes = require('./routes/definitions');

var app = express();

//set session engine
//enable if will store token for user session stored in mongo/redis
/*app.use(session({
    secret: secret.session.keyPhrase,
    cookie: { secure: true }
}));*/

//set app template engine function and file extension
app.engine('html', swig.renderFile);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//api controllers routers
app.use('/api',userRoutes);
app.use('/api', filmsRoutes);
app.use('/api', theaterRoutes);
app.use('/api', eventRoutes);
app.use('/api', definitionsRoutes);

//default route
app.use('/*', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//last time exception handler, the email to dev team could be send here
process.on('uncaughtException', function(err) {
    console.log('An uncaught exception was handled, error: ' + JSON.stringify(err));
    process.exit(1);
});

module.exports = app;