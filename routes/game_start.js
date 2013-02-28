var echojs = require('echojs')
	, SongCard = require('../models/songcards_schema')
	, mongoose = require('mongoose');

var echo = echojs({
  key: "ZGVDBBCDA3UZA5GQY"
});



exports.index = function(req, res){
	getSongs(function(songlist) {
		for (var i=0; i<songlist.length; i++) {
			SongCard.findOne({title: songlist[i].title, artist: songlist[i].artist_name}).exec(function (err, response) {
				if (err) {
					console.log("Error finding existing song card", err);
				} else if (!response) {
					var newSongCard = new SongCard({title: songlist[i].title, artist: songlist[i].artist_name});
					newSongCard.save(function(err) {
						if (err) {
							console.log("Error saving new song card", err);
						}
					});
				}
			});
		}
		res.redirect('/songcards');
	});
};

exports.songcards = function(req, res) {
	var allSongCards = SongCard.find({}).sort('title').exec(function(err, response) {
		if (err) {
			console.log("Error finding all song cards", err);
		} else {
			res.send(response);
		}
	});
};


// This search functionality accounts for duplicates but not when there are slight variations in title/artist name.
// Genre ideas: pop, country, electronic, hip hop, r&b, rap, rock, show tunes

// I also don't know how this is going to work once the players run out of songs. Whatever, moving on.

function getSongs(callback) {
	echo('song/search').get({results: 100, sort: 'song_hotttnesss-desc'}, function (err, json) { // style: 'pop'
		var songlist = [];
		var dups = [];
		for (var i=0; i<json.response.songs.length; i++) {
			var hash = json.response.songs[i].artist_name + '|' + json.response.songs[i].title;
			if (dups.indexOf(hash) == -1) {
				dups.push(hash);
				songlist.push(json.response.songs[i]);
			} else {
				continue;
			};
		}
		callback(songlist);
	});
};