var mongoose = require('mongoose');

var themecards_schema = mongoose.Schema({
	theme: String,
	inDeck: Boolean
});

var themecard = mongoose.model('themecard', themecards_schema);

module.exports = themecard;