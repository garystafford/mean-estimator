'use strict';

/**
 * Module dependencies.
 */
var express    = require('express'),
passport       = require('passport'),
flash          = require('connect-flash'),
config         = require('./config'),
consolidate    = require('consolidate'),
path           = require('path'),
utilities      = require('./utilities'),
favicon        = require('serve-favicon'),
logger         = require('morgan'),
methodOverride = require('method-override'),
session        = require('express-session'),
mongoStore     = require('connect-mongo')(session),
bodyParser     = require('body-parser'),
multer         = require('multer'),
compression    = require('compression'),
errorHandler   = require('errorhandler');

module.exports = function (db) {
    // Initialize express app
    var app = express();

    // Initialize models
    utilities.walk('./app/models').forEach(function (modelPath) {
        require(path.resolve(modelPath));
    });

    // Setting the environment locals
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    app.locals.keywords = config.app.keywords;
    app.locals.facebookAppId = config.facebook.clientID;
    app.locals.modulesJSFiles = utilities.walk('./public/modules', /(.*)\.(js)/, /(.*)\.(spec.js)/, './public');
    app.locals.modulesCSSFiles = utilities.walk('./public/modules', /(.*)\.(css)/, null, './public');

    // Passing the request url to environment locals
    app.use(function (req, res, next) {
        res.locals.url = req.protocol + ':// ' + req.headers.host + req.url;
        next();
    });

    // Should be placed before express.static
    app.use(compression({
        filter: function (req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level : 9
    }));

    // Showing stack errors
    app.set('showStackError', true);

    // Set swig as the template engine
    app.engine('html', consolidate[config.templateEngine]);

    // all environments
    app.set('view engine', 'html');
    app.set('views', config.root + '/app/views');
    app.set('port', config.port || 3000);
    app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(logger('dev'));
    app.use(methodOverride());
    app.use(session({
        resave           : true,
        saveUninitialized: true,
        secret           : config.sessionSecret,
        store            : new mongoStore({
            db        : db.connection.db,
            collection: config.sessionCollection
        })
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(multer());
    app.use(express.static(path.join(__dirname, 'public')));

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    // connect flash for flash messages
    app.use(flash());

    // Setting the app router and static folder
    app.use(express.static(config.root + '/public'));

    // Load Routes
    utilities.walk('./app/routes').forEach(function (routePath) {
        require(path.resolve(routePath))(app);
    });

    // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
    app.use(function (err, req, res, next) {
        // If the error object doesn't exists
        if (!err) return next();

        // Log it
        console.error(err.stack);

        // Error page
        res.status(500).render('500.html', {
            error: err.stack
        });
    });

    // Assume 404 since no middleware responded
    app.use(function (req, res) {
        res.status(404).render('404.html', {
            url  : req.originalUrl,
            error: 'Not Found'
        });
    });

    // error handling middleware should be loaded after the loading the routes
    var env = process.env.NODE_ENV || 'development';
    if ('development' === env) {
        app.use(errorHandler());
    }

    //app.listen(app.get('port'), function () {
    //  console.log('Express server listening on port ' + app.get('port'));
    //});

    // Application Configuration for production environment
    if ('production' === env) {
        app.locals.cache = 'memory'; // To solve SWIG Cache Issues
    }

    return app;
};