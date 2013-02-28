var echojs = require('echojs');

var echo = echojs({
  key: "ZGVDBBCDA3UZA5GQY"
});


exports.index = function(req, res){
	echo('song/search').get({style: 'pop', results: 100}, function (err, json) { //
		var songlist = [];
		var dups = [];
		for (var i=0; i<json.response.songs.length; i++) {
			var hash = json.response.songs[i].artist_name + '|' + json.response.songs[i].title;
			console.log(hash + ' ' + i)
			if (dups.indexOf(hash) == -1) {
				dups.push(hash);
				songlist.push(json.response.songs[i]);
			} else {
				continue;
			};
		}
		res.send(songlist);
	});
};

// All the genres we will want:
// country
// electronic
// hip hop
// pop
// r&b
// rap
// rock
// show tunes
