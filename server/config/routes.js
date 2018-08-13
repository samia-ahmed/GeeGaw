var home = require('../controllers/homeController.js');
var path = require('path');

module.exports = function(app){
    
    // app.get('/', function(req,res){
    //     // res.render('index')
    //     console.log("??")
    // })

    app.get('*', function(req,res){
        res.sendFile(path.resolve('./client/src/index.html'))
    })
}