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
	// console.log(req.session.user);
	var songs = [];
	for (i=0; i<6; i++) { // YOU'RE GONNA WANT A CALLBACK FOR THIS.
		SongCard.findOne({}).exec(function (err, response) {
			if (err) {
				console.log("Error getting song card", err);
			} else {
				console.log(response);
				songs.push(response);
			}
		});
	}

	console.log(songs);
    // res.render('gameview', {title:'Express',theme:"happy", songs:[
    //     {name:"Beauty And A Beat", artist:"Justin Bieber", id:"t17846091"},
    //     {name:"Call Me Maybe", artist:"Carly Rae Jepsen", id:"t15832423"},
    //     {name:"Ho Hey", artist:"The Lumineers", id:"t15999172  "},
    //     {name:"It's Time", artist:"Imagine Dragons", id:"t15652628"},
    //     {name:"Lights", artist:"Ellie Goulding", id:"t5482177"},
    //     {name:"Little Talks", artist:"Of Monsters and Men", id:"t16498218"} ]});
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