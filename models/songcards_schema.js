var mongoose = require('mongoose');

var songcards_schema = mongoose.Schema({
	title: String,
	artist: String,
	track: String,
	inDeck: Boolean,
	hotness: String
});

var songcard = mongoose.model('songcard', songcards_schema);

module.exports = songcard;