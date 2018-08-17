var home = require('../controllers/homeController.js');
var path = require('path');

module.exports = function(app){
    
    app.post('/register',function(req,res){
        home.registerUser(req,res);
    })
    app.post('/login', function(req, res){
        home.login(req, res);
    })
    app.get('/logout', function(req,res){
        home.logout(req,res);
    })
    app.get('/sess', function(req,res){
        home.checkSess(req,res);
    })

    //is this supposed to be app.all instead of app.get?
    app.get('*', function(req,res){
        res.sendFile(path.resolve('./client/src/index.html'))
    })
}