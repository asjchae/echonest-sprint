var echojs = require('echojs')
	, SongCard = require('../models/songcards_schema')
	, mongoose = require('mongoose');

var echo = echojs({
  key: "ZGVDBBCDA3UZA5GQY"
});


// WHY
// Maybe split it into another function

exports.index = function(req, res){
	getSongs(function(songlist) {
		for (var i=0; i<songlist.length; i++) {
			songcardMaker(songlist[i], function() { // Do I need the callback?
			});
		}
	});
	res.redirect('/songcards');
};

function songcardMaker(song, callback) {
	var titulo = song.title.toString();
	var artista = song.artist_name.toString();
	SongCard.findOne({title: titulo}).exec(function (err, response) {
		if (err) {
			console.log("Error finding existing song card", err);
		} else if (!response) {
			var newSongCard = new SongCard({title: titulo, artist: artista});
			newSongCard.save(function(err) {
				if (err) {
					console.log("Error saving new song card", err);
				}
				console.log("saved new song");
				console.log(newSongCard);
			});
		}
		callback(); // Do I need this?
	});
}

exports.songcards = function(req, res) {
	var allSongCards = SongCard.find({}).exec(function(err, response) {
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
		console.log(json);
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