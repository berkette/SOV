var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/SOV')
var db = mongoose.connection

// connect-mongo session store
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

// passport authentication
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

app.use(favicon(path.join(__dirname, 'public', 'images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    req.db = db; // put database into request
    next();
})
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "foo",
    store: new MongoStore({mongooseConnection: db})
}));
app.use(passport.initialize());
app.use(passport.session());

var users = require('./routes/users');
app.use('/users', users);

// passport config
var Summoner = require('./models.js').Summoner;
passport.use(new LocalStrategy(Summoner.authenticate()));
passport.serializeUser(Summoner.serializeUser());
passport.deserializeUser(Summoner.deserializeUser());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
var debug = true
if (debug) {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
} else {
    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: {}
        });
    });
}

module.exports = app;
