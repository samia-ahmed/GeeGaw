var home = require('../controllers/homeController.js');
var path = require('path');

module.exports = function(app){
    
    app.post('/register',function(req,res){
        home.registerUser(req,res);
    })
    app.post('/login', function(req, res){
        home.login(req, res);
    })
    app.post('/new', function(req,res){
        home.newPost(req,res);
    })
    app.get('/follow/:id', function(req,res){
        home.follow(req,res);
    })
    app.get('/updateFeed', function(req,res){
        home.updateFeed(req,res);
    })
    app.get('/allUsers',function(req,res){
        home.allUsers(req,res);
    })
    app.get('/logout', function(req,res){
        home.logout(req,res);
    })
    app.get('/sess', function(req,res){
        home.checkSess(req,res);
    })

    //is this supposed to be app.all instead of app.get?
    app.all('*', function(req,res){
        res.sendFile(path.resolve('./client/dist/client/index.html'))
    })
}