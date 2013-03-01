var SongCard = require('../models/songcards_schema')
	, mongoose = require('mongoose');

// Lists all song cards.
exports.songcards = function(req, res) {
	var allSongCards = SongCard.find({}).exec(function(err, response) {
		if (err) {
			console.log("Error finding all song cards", err);
		} else {
			res.send(response);
		}
	});
};


// Deletes all song cards.
exports.delete = function(req, res) {
	var deleteAll = SongCard.find({}).remove();
	res.redirect('/songcards');
}