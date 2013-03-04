var echojs = require('echojs')
	, SongCard = require('../models/songcards_schema')
	, ThemeCard = require('../models/themecards_schema')
	, mongoose = require('mongoose')
	, async = require('async')
	, User = require('../models/user_schema');


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

// Screen where players can choose which card to submit.
exports.playerscreen = function(req, res) {
	var songs = [];
	getHand(songs, function(songs) {
		getHand(songs, function(songs) {
			getHand(songs, function(songs) {
				getHand(songs, function(songs) {
					getHand(songs, function(songs) {
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
													res.render('gameview', {title: 'Express', theme: "Happy", songs: hand});
												}
											});
										}
									});
								}
							});
						});
					});
				});
			});
		});
	});
};

function getHand(songs, callback) {
	SongCard.findOne({inDeck: true}).exec(function (err, response) {
		if (err) {
			console.log("Error getting song card", err);
		} else {
			songs.push(response);
			response.set({inDeck: false});
			response.save(function (err) {
				if (err) {
					console.log("Error marking card as inDeck: false", err);
				}
				callback(songs);
			});
		}
	});
};

// PSEUDO-CODE

/*
Yo, I want to get a card where inDeck = true. Are there cards?
Yes: Get a card.
No: Look at all the SongCards and find the one with the lowest hotttnesss and do a search based on that.


*/


// Screen that players see while waiting for the dealer to choose; they can see all the submitted cards.
exports.playerwait = function(req, res) {

};

// Everyone sees the results.
exports.roundfinish = function(req, res) {

};


// THE POSTS

exports.start = function(req, res) {

};

exports.playersubmit = function(req, res) {

};

exports.dealersubmit = function(req, res) {

};