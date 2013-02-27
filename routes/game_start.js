var echojs = require('echojs');

var echo = echojs({
  key: "ZGVDBBCDA3UZA5GQY"
});


exports.index = function(req, res){
	echo('song/search').get({style: 'pop'}, function (err, json) { // song_min_hotttnesss: .8
		res.send(json.response);
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
