var echojs = require('echojs')
	, SongCard = require('../models/songcards_schema')
	, ThemeCard = require('../models/themecards_schema')
	, mongoose = require('mongoose')
	, async = require('async')
	, User = require('../models/user_schema')
	, cards = require('../routes/cards');


// NOTE: don't delete card until after dealer chooses so we know who won


// Starts a new round.
exports.newround = function(req, res) {

};

// The screen the dealer sees to pick.
exports.dealerscreen = function(req, res) {

};

// The waiting screen for the dealer while players pick their submissions.
exports.dealerwait = function(req, res) {

};


function getTheme(callback) {
	ThemeCard.findOne({inDeck: true}).exec(function (err, response) {
		if (err) {
			console.log("Error getting theme card", err);
		} else if (!response) {
			cards.themecards(function() {
				ThemeCard.findOne({inDeck: true}).exec(function (err, response) {
					if (err) {
						console.log("Error getting theme card", err);
					} else {
						thema = response;
						thema.set({inDeck: false});
						thema.save(function (err) {
							if (err) {
								console.log("Error", err);
							} else {
								callback(thema);
							}
						});
					}
				});
			});
		} else {
			var theme = response;
			theme.set({inDeck: false});
			theme.save(function (err) {
				if (err) {
					console.log("Error", err);
				} else {
					callback(theme);
				}
			});

		}
	});
}

// Screen where players can choose which card to submit.
exports.playerscreen = function(req, res) {
	var thema;
	getTheme(function(theme) {
		thema = theme.theme;
	});
	var songs;
	getHand(songs, function(songs) {
		User.findOne({username: req.session.user}).exec(function (err, response) {
			if (err) {
				console.log("Error", err);
			} else {
				response.set({card_hand: songs});
				response.save(function (err) {
					if (err) {
						console.log("Error saving hand", err);
					} else {
						User.findOne({username: response.username}).populate('card_hand').exec(function (err, response) {
							if (err) {
								console.log("Error", err);
							} else {
								var hand = response.card_hand;
								res.render('gameviewpartial', {title: 'Express', theme: thema, songs: hand}); // changed from 'gameview' to 'gameviewpartial'
							}
						});
					}
				});
			}
		});
	});
};

function getHand(songs, callback) {
	SongCard.find({inDeck: true}).limit(6).exec(function (err, response) {
		if (err) {
			console.log("Error getting song card", err);
		} else if (response[0] == null) {
			getMore(function(songs) {
				callback(songs);
			});
		} else {
			if (response.length == 6) {
				songs = response;
				async.forEach(response, function(item, next) {
					setFalse(item, next);
				}, function (err) {
					if (err) {
						console.log("Error", err);
					}
					callback(songs);
				});				
			} else {
				getMore(function(songs) {
					callback(songs);
				});
			}
		}
	});
};

function getMore(callback) {
	SongCard.findOne({}).sort('hotness').exec(function (err, response) {
		if (!response) {
			cards.songcards(1, function() {
				SongCard.find({inDeck: true}).limit(6).exec(function (err, response) {
					if (err) {
						console.log("Error getting song card", err);
					} else {
						songs = response;
						async.forEach(response, function(item, next) {
							setFalse(item, next);
						}, function (err) {
							if (err) {
								console.log("Error", err);
							}
							callback(songs);
						});
					}
				});
			});
		} else {
			var max = response.hotness;
			cards.songcards(max, function() {
				SongCard.find({inDeck: true}).limit(6).exec(function (err, response) {
					if (err) {
						console.log("Error getting song card", err);
					} else {
						songs = response;
						async.forEach(response, function(item, next) {
							setFalse(item, next);
						}, function (err) {
							if (err) {
								console.log("Error", err);
							}
							callback(songs);
						});
					}
				});
			});
		}
	});
}

function setFalse(song, callback) {
	song.set({inDeck: false});
	song.save(function (err) {
		if (err) {
			console.log("Error marking card as inDeck: false", err);
		}
		callback();
	});
};


// Screen that players see while waiting for the dealer to choose; they can see all the submitted cards.
exports.playerwait = function(req, res) {

};

// Everyone sees the results.
exports.roundfinish = function(req, res) {
	res.send("Yay!")

};


// THE POSTS

exports.start = function(req, res) {

};

exports.playersubmit = function(req, res) {
	var thema;
	getTheme(function(theme) {
		thema = theme.theme;
	});
	User.findOne({username: req.session.user}).populate('card_hand').exec(function (err, response) {
		var user = response;
		if (err) {
			console.log("Error", err);
		} else if (!response) {
			console.log("Please log in");
		} else {
			var cardhand = response.card_hand;
			cardhand = cardhand.filter(function(card) {
				if (card.title != req.body.title) {
					return true;
				}
			});
			SongCard.findOne({inDeck: true}).exec(function (err, response) {
				if (err) {
					console.log("Error", err);
				} else if (!response) {
					getMore2(function(song) {
						cardhand.push(song);
						user.set({card_hand: cardhand});
						user.save(function (err) {
							if (err) {
								console.log("Error saving hand", err);
							} else {
								User.findOne({username: user.username}).populate('card_hand').exec(function (err, response) {
									if (err) {
										console.log("Error", err);
									} else {
										var hand = response.card_hand;
										res.render('gameviewpartial', {title: 'Express', theme: thema, songs: hand});
									}
								});
							}
						});
					});
				} else {
					cardhand.push(response);
					response.set({inDeck: false});
					response.save(function (err) {
						if (err) {
							console.log("Error setting card as inDeck: false");
						}
					});
					user.set({card_hand: cardhand});
					user.save(function (err) {
						if (err) {
							console.log("Error saving hand", err);
						} else {
							User.findOne({username: user.username}).populate('card_hand').exec(function (err, response) {
								if (err) {
									console.log("Error", err);
								} else {
									var hand = response.card_hand;
									console.log(hand);
									res.render('gameviewpartial', {title: 'Express', theme: thema, songs: hand});
								}
							});
						}
					});
				}
			});
		}
	});
};

function getMore2(callback) {
	SongCard.findOne({}).sort('hotness').exec(function (err, response) {
		var max = response.hotness;
		cards.songcards(max, function() {
			SongCard.findOne({inDeck: true}).exec(function (err, response) {
				if (err) {
					console.log("Error", err);
				} else {
					song = response;
					song.set({inDeck: false});
					song.save(function (err) {
						if (err) {
							console.log("Error", err)
						} else {
							callback(song);
						}
					});
				}
			});
		});
	});
};

exports.dealersubmit = function(req, res) {
	console.log("Dealer:" + req.body)
};