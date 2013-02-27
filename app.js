
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , echojs = require('echojs')
  , echotest = require('./routes/echotest');

var app = express();
var echo = echojs({
  key: "ZGVDBBCDA3UZA5GQY"
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// GET requests
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/login', routes.login);
app.get('/gameexplorer', routes.gameexplorer);
app.get('/gameview', routes.gameview);

// POST requests

// Tests
app.get('/echotest', echcotest.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
