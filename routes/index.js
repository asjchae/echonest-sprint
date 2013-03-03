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
  res.render('gameview', {title:'Express',theme:"happy", songs:[{name:"song1", artist:"artist1"},{name:"song2", artist:"artist2"},{name:"song3", artist:"artist3"}, {name:"song4", artist:"artist4"}, {name:"song5", artist:"artist5"}, {name:"song6", artist:"artist6"} ]});
};
