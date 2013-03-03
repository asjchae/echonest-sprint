var echojs = require('echojs')
	, SongCard = require('../models/songcards_schema')
	, ThemeCard = require('../models/themecards_schema')
	, mongoose = require('mongoose')
	, async = require('async');


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
	res.render('gameview', {title:'Express',theme:"happy", songs:[{name:"song1", artist:"artist1"},{name:"song2", artist:"artist2"},{name:"song3", artist:"artist3"}, {name:"song4", artist:"artist4"}, {name:"song5", artist:"artist5"}, {name:"song6", artist:"artist6"} ]});
};

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