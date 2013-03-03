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
    res.render('gameview', {title:'Express',theme:"happy", songs:[
        {name:"Beauty And A Beat", artist:"Justin Bieber", id:"t17846091"},
        {name:"Call Me Maybe", artist:"Carly Rae Jepsen", id:"t15832423"},
        {name:"Ho Hey", artist:"The Lumineers", id:"t15999172  "},
        {name:"It's Time", artist:"Imagine Dragons", id:"t15652628"},
        {name:"Lights", artist:"Ellie Goulding", id:"t5482177"},
        {name:"Little Talks", artist:"Of Monsters and Men", id:"t16498218"} ]})
      
};

