
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , echojs = require('echojs')
  , gamestart = require('./routes/game_start')
  , mongoose = require('mongoose')
  , admin = require('./routes/admin');

var app = express();

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
  mongoose.connect(process.env.MONGOLAB_URI || 'localhost/echonest-sprint');
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


app.get('/gamestart', gamestart.index);

app.get('/songcards/delete', admin.delete);
app.get('/songcards', admin.songcards);

// POST requests
app.post('/signin', routes.signin)

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
