
/**
 * Module dependencies.
 */

var express = require('express')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , echojs = require('echojs')
  , cards= require('./routes/cards')
  , mongoose = require('mongoose')
  , admin = require('./routes/admin')
  , gameplay = require('./routes/gameplay')
  , dealer = require('./routes/dealer');

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

app.get('/', user.login);
app.get('/play', gameplay.playerscreen);
// app.get('/rules', gameplay.rules);
// app.get('/contact', gameplay.contact);


app.get('/getthemecards', cards.themecards)

app.get('/songcards/delete', admin.deletesongcards);
app.get('/songcards', admin.songcards);
app.get('/themecards/delete', admin.deletethemecards);
app.get('/themecards', admin.themecards); 
app.get('/users', admin.allusers);
app.get('/users/delete', admin.deleteusers);
app.get('/dealercards/delete', admin.deletedealercards);
app.get('/test', admin.testrefresh);

// Game Play

// app.get('/newround', gameplay.newround); // start a new round
app.get('/dealer', dealer.dealerscreen); // the screen the dealer sees to pick
// app.get('/playerwait', gameplay.playerwait); // players wait for the dealer to choose
app.get('/roundfinish', gameplay.roundfinish);  // everyone sees the results
app.get('/getupdates', dealer.getupdates);
// note: don't delete card until after dealer chooses so we know who won

// app.post('/start', gameplay.start);
app.post('/playersubmit', gameplay.playersubmit);
app.post('/dealersubmit', dealer.dealersubmit);
app.post('/dealerwait', dealer.dealerwait); // waiting screen for the dealer while players pick


// POST requests
app.post('/signin', user.signin)

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
