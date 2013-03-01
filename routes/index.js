
/*
 * GET home page.
 */
  var echojs = require('echojs');

  var echo = echojs({
    key: "ZGVDBBCDA3UZA5GQY"
    });


exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

//test route for making views
exports.login = function(req, res){
  res.render('login', { title: 'Express' });
};


//test route for making views
exports.gameexplorer = function(req, res){
  res.render('gameexplorer', { title: 'Express' });
};


//test route for making views
exports.gameview = function(req, res){
  res.render('gameview', { title: 'Express' });
};



//test route for making views
exports.signin = function(req, res){
    
    // // http://developer.echonest.com/docs/v4/artist.html#profile
    // echo('song/profile').get({
    //   id: 'SOBPPEF13669E897AF',
    //   track_id: 'TRTLKZV12E5AC92E11',
    //   bucket: [ 'id:rdio-US', 'tracks']
    // }, function (err, json) {
    //   // console.log(json.response.songs[1].tracks)
    //   console.log(json.response.songs)
    //   // var foreign_ids = json.response.artist.foreign_ids;
    //   // console.log('Radiohead\'s IDs on other services:');
    //   // console.log(json.response.artist);

    //   echo('song/profile').get({
    //     id: foreign_ids[0].foreign_id
    //   }, function (err, json) {
    //     console.log('\n...and from', foreign_ids[0].foreign_id, 'back to Echonest:');
    //     console.log(json.response);
        
    //   });
    // });
    console.log(req.body)
    console.log(req.body.inputUsername)
    if (req.body.inputUsername == 'fail'){
      console.log("got here")
      res.send("Password failed! Please try again")
    }
    else{
      res.render('gameview', {title:'Express',theme:"happy", songs:[{name:"song1", artist:"artist1"},{name:"song2", artist:"artist2"},{name:"song3", artist:"artist3"}, {name:"song4", artist:"artist4"}, {name:"song5", artist:"artist5"}, {name:"song6", artist:"artist6"} ]});
    }            
    
};