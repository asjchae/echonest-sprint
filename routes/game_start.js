var echojs = require('echojs');

var echo = echojs({
  key: "ZGVDBBCDA3UZA5GQY"
});


exports.index = function(req, res){
	echo('song/search').get({style: 'country', song_min_hotttnesss: .5, results: 20}, function (err, json) {
		res.send(json.response);
	});
};
