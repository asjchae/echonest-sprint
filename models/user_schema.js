var mongoose = require('mongoose');

var user_schema = mongoose.Schema({
	username: String,
	password: String,
	score: Number,
	card_hand: [{type: mongoose.Schema.Types.ObjectId, ref: 'songcard'}],
	is_dealer: Boolean
});

var user = mongoose.model('user', user_schema);

module.exports = user;