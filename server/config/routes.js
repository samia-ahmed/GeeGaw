var home = require('../controllers/homeController.js');
var path = require('path');

module.exports = function(app){
    
    // app.get('/', function(req,res){
    //     // res.render('index')
    //     console.log("??")
    // })
    app.post('/loginUser', function(){
        console.log("in the routes");
        home.loginUser();
        
    })

    app.get('*', function(req,res){
        res.sendFile(path.resolve('./client/src/index.html'))
    })
}