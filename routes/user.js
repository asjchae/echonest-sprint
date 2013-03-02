var User = require('../models/user_schema')
	, mongoose = require('mongoose');

// User schema contains:

	// username: String,
	// password: String,
	// score: Number,
	// card_hand: [{type: mongoose.Schema.Types.ObjectId, ref: 'songcard'}],
	// is_dealer: Boolean

exports.newuser = function(req, res) {
	
}