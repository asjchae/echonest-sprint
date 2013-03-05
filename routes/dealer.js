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
	var theme;
	Dealer.findOne({}).populate('theme').exec(function (err, response) {
		if (response == null){
			res.render('dealerviewfirst', {title: 'Express', theme: "Wait for it...", songs: []});	
		} else{
			if (response.theme[0].theme == null) {
				theme = response.theme[0].theme;
			} else {
				theme = "Wait for it...";
			}
			console.log(theme);
			res.render('dealerviewfirst', {title: 'Express', theme: theme, songs: []});
		}
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
	Dealer.findOne({}).populate('submitted_cards').populate('theme').exec(function (err, response) {
		submitted =[]
		if (response == null) {
			return;
		} else if (response != null){
			var submitted = response.submitted_cards;
		}

		console.log(response.theme[0].theme)
		console.log(submitted)
		res.render('gameviewdealerpartial', {title: 'Express', theme: response.theme[0].theme, songs: submitted});
	});
};