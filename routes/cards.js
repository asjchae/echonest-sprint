var echojs = require('echojs')
	, SongCard = require('../models/songcards_schema')
	, ThemeCard = require('../models/themecards_schema')
	, mongoose = require('mongoose')
	, async = require('async');


// Echonest API Key

var echo = echojs({
  key: "ZGVDBBCDA3UZA5GQY"
});


// Gets songs from Echonest.
exports.songcards = function(maxhot, callback){
	getSongs(maxhot, function(songlist) {
		async.forEach(songlist, function(item, next) {
			songcardMaker(item, next);
		}, function (err) {
			if (err) {
				console.log("Error", err);
			}
			callback();
		});
	});
};

// This search functionality accounts for duplicates but not when there are slight variations in title/artist name.
// Genre ideas: pop, country, electronic, hip hop, r&b, rap, rock, show tunes

// I also don't know how this is going to work once the players run out of songs. Whatever, moving on.

function getSongs(maxhot, callback) {
	echo.debug = true;
	echo('song/search').get({results: 100, song_max_hotttnesss: maxhot, sort: 'song_hotttnesss-desc', bucket: ['tracks', 'id:rdio-US', 'song_hotttnesss']}, function (err, json) { // style: 'pop'
		var songlist = [];
		var dups = [];
		for (var i=0; i<json.response.songs.length; i++) {
			if (json.response.songs[i].tracks.length == 0) {
				continue;
			}
			// if (json.response.songs[i].title.toString().split('(').length > 1) {
			// 	continue;
			// // } else if (json.response.songs[i].title.toString().split(' ').length > 4) {
			// // 	continue;
			// } else {
				var hash = json.response.songs[i].artist_name + '|' + json.response.songs[i].title;
				if (dups.indexOf(hash) == -1) {
					dups.push(hash);
					songlist.push(json.response.songs[i]);
				} else {
					continue;
				};				
			// }
		}
		console.log(songlist[0].tracks);
		callback(songlist);
	});
};


// Saves to the SongCard database.

function songcardMaker(song, callback) {
	var titulo = song.title.toString();
	var artista = song.artist_name.toString();
	var tracks = song.tracks[0].foreign_id.toString();
	var rdiotrack = tracks.split(':')[2];
	var hot = song.song_hotttnesss;
	SongCard.findOne({title: titulo}).exec(function (err, response) {
		if (err) {
			console.log("Error finding existing song card", err);
		} else if (!response) {
			var newSongCard = new SongCard({title: titulo, artist: artista, track: rdiotrack, inDeck: true, hotness: hot}); // 
			newSongCard.save(function(err) {
				if (err) {
					console.log("Error saving new song card", err);
				}
				callback();
			});
		} else {
			callback();
		}
	});
}

// Make theme cards.

exports.themecards = function(callback) {
	var themes = ['Sad', 'Happy', 'Childhood', 'Party', 'Day on the beach', 'Workout', 'Study', 'Sleep', 'Angry', 'Helen Keller'];
	async.forEach(themes, function(item, next){
		themecardMaker(item, next);
	}, function (err) {
		if (err) {
			console.log("Error", err);
		}
		callback();
	});
};


function themecardMaker(theme, callback) {
	// ThemeCard.findOne({theme: theme}).exec(function (err, response) {
	// 	if (err) {
	// 		console.log("Error finding existing theme card", err);
	// 	} else if (!response) {
			var newThemeCard = new ThemeCard({theme: theme, inDeck: true});
			newThemeCard.save(function(err) {
				if (err) {
					console.log("Error saving new theme card", err);
				}
			callback();
			});
	// 	} else {
	// 		callback();
	// 	}
	// });
}