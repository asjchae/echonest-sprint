
/*
 * GET home page.
 */

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
    console.log(req.body)
    if (req.body.inputUsername == "fail"){
        res.send("Password failed! Please try again")
    }
        res.render('gameview', { title: 'Express' });
};