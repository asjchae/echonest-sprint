var User = require('../models/user_schema')
	, mongoose = require('mongoose');

// User schema contains:

	// username: String,
	// password: String,
	// score: Number,
	// card_hand: [{type: mongoose.Schema.Types.ObjectId, ref: 'songcard'}],
	// is_dealer: Boolean

exports.login = function(req, res) {
	res.render('login', { title: 'Express' });
}

exports.signin = function(req, res) {
	User.findOne({username: req.body.inputUsername}).exec(function (err, response) {
		if (err) {
			console.log("Error finding username", err);
		} else if (!response) {
			var user = new User({username: req.body.inputUsername});
			user.save(function (err) {
				if (err) {
					console.log("Error saving new user", err);	
				} else {
					login(req, res, user);
				}	
			});
		} else {
			login(req, res, user);
		}
	});
};

function login(req, res, user) {
	req.session.user = req.body.inputUsername;
	return res.redirect('/gameview');
};
 