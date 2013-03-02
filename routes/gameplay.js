var echojs = require('echojs')
	, SongCard = require('../models/songcards_schema')
	, ThemeCard = require('../models/themecards_schema')
	, mongoose = require('mongoose')
	, async = require('async');

// NOTE: don't delete card until after dealer chooses so we know who won

// app.get('/roundfinish', gameplay.roundfinish);  // everyone sees the results

// app.post('/start', gameplay.start);
// app.post('/playersubmit', gameplay.playersubmit);
// app.post('/dealersubmit', gameplay.dealersubmit);

// Starts a new round.
exports.newround = function(req, res) {

};

// The screen the dealer sees to pick.
exports.dealerscreen = function(req, res) {

};

// The waiting screen for the dealer while players pick their submissions.
exports.dealerwait = function(req, res) {

};

// Screen where players can choose which card to submit.
exports.playerscreen = function(req, res) {

};

// Screen that players see while waiting for the dealer to choose; they can see all the submitted cards.
exports.playerwait = function(req, res) {

};


exports.roundfinish = function(req, res) {

};

exports.start = function(req, res) {

};

exports.playersubmit = function(req, res) {

};

exports.dealersubmit = function(req, res) {

};