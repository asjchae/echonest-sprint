var echojs = require('echojs');

var echo = echojs({
  key: "ZGVDBBCDA3UZA5GQY"
});

echo('song/search').get({artist: 'radiohead', title: 'karma police'}, function (err, json) {
  console.log(json.response);
});