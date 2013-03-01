var SongCard = require('../models/songcards_schema')
	, mongoose = require('mongoose');

exports.delete = function(req, res) {
	var deleteAll = SongCard.find({}).remove();
	res.redirect('/songcards');
}