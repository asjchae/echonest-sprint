var echojs = require('echojs')
	, SongCard = require('../models/songcards_schema')
	, ThemeCard = require('../models/themecards_schema')
	, mongoose = require('mongoose')
	, async = require('async');


// app.get('/newround', gameplay.newround); // start a new round
// app.get('/dealerscreen', gameplay.dealerscreen); // the screen the dealer sees to pick
// app.get('/dealerwait', gameplay.dealerwait); // waiting screen for the dealer while players pick
// app.get('/playerscreen', gameplay.playerscreen); // players can choose
// app.get('/playerwait', gameplay.playerwait); // players wait for the dealer to choose
// app.get('/roundfinish', gameplay.roundfinish);  // everyone sees the results

// // note: don't delete card until after dealer chooses so we know who won

// app.post('/start', gameplay.start);
// app.post('/playersubmit', gameplay.playersubmit);
// app.post('/dealersubmit', gameplay.dealersubmit);

