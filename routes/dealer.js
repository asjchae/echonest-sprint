var echojs = require('echojs')
	, SongCard = require('../models/songcards_schema')
	, ThemeCard = require('../models/themecards_schema')
	, mongoose = require('mongoose')
	, async = require('async')
	, User = require('../models/user_schema')
	, cards = require('../routes/cards')
	, Dealer = require('../models/dealer_schema');

// The screen the dealer sees to pick.
exports.dealerscreen = function(req, res) {
	Dealer.findOne({}).populate('theme').exec(function (err, response) {
		console.log(response);
	});
};

// The waiting screen for the dealer while players pick their submissions.
exports.dealerwait = function(req, res) {
	console.log(req.body.title);
	console.log(req.session.user);
};

exports.dealersubmit = function(req, res) {
	console.log("Dealer:" + req.body)
};

exports.getupdates = function(req, res) {

};