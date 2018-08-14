var home = require('../controllers/homeController.js');
var path = require('path');

module.exports = function(app){
    
    // app.get('/', function(req,res){
    //     // res.render('index')
    //     console.log("??")
    // })
    app.post('/loginUser', function(req, res){
        console.log("in the routes");
        home.loginUser(req, res)
    })

    //is this supposed to be app.all instead of app.get?
    app.get('*', function(req,res){
        res.sendFile(path.resolve('./client/src/index.html'))
    })
}