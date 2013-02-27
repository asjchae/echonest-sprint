var echo = echojs({
  key: "ZGVDBBCDA3UZA5GQY"
});

// http://developer.echonest.com/docs/v4/song.html#search
echo('song/search').get({
  artist: 'radiohead',
  title: 'karma police'
}, function (err, json) {
  console.log(json.response);
});

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};