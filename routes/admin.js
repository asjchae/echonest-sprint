var SongCard = require('../models/songcards_schema')
	, ThemeCard = require('../models/themecards_schema')
	, mongoose = require('mongoose');

// Lists all song cards.
exports.songcards = function(req, res) {
	var allSongCards = SongCard.find({}).sort('title').exec(function(err, response) {
		if (err) {
			console.log("Error finding all song cards", err);
		} else {
			res.send(response);
		}
	});
};


// Deletes all song cards.
exports.deletesongcards = function(req, res) {
	var deleteAll = SongCard.find({}).remove();
	res.redirect('/songcards');
}

// Lists all theme cards.
exports.themecards = function(req, res) {
	var allThemeCards = ThemeCard.find({}).sort('theme').exec(function(err, response) {
		if (err) {
			console.log("Error finding all theme cards", err);
		} else {
			res.send(response);
		}
	});
}

// Deletes all theme cards.
exports.deletethemecards = function(req, res) {
	var deleteAll = ThemeCard.find({}).remove();
	res.redirect('themecards');
}