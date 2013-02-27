
// http://developer.echonest.com/docs/v4/song.html#search

exports.index = function(req, res){
	echo('song/search').get({artist: 'radiohead', title: 'karma police'}, function (err, json) {
		console.log(json.response);
	});

	res.send("Hello, echotesting 1-2-3");
};