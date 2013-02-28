var echojs = require('echojs');

var echo = echojs({
  key: "ZGVDBBCDA3UZA5GQY"
});



exports.index = function(req, res){

// This search functionality accounts for duplicates but not when there are slight variations in title/artist name.
// Genre ideas: pop, country, electronic, hip hop, r&b, rap, rock, show tunes

// I also don't know how this is going to work once the players run out of songs. Whatever, moving on.

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
		res.send(songlist);
		return songlist;
	});
};

