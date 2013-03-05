var echojs = require('echojs')
	, SongCard = require('../models/songcards_schema')
	, ThemeCard = require('../models/themecards_schema')
	, mongoose = require('mongoose')
	, async = require('async')
	, User = require('../models/user_schema')
	, cards = require('../routes/cards');
	
// The screen the dealer sees to pick.
exports.dealerscreen = function(req, res) {

};

// The waiting screen for the dealer while players pick their submissions.
exports.dealerwait = function(req, res) {

};

exports.dealersubmit = function(req, res) {
	console.log("Dealer:" + req.body)
};