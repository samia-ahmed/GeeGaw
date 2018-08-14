var mongoose = require("mongoose"), 
  User = mongoose.model('User'), 
  Post = mongoose.model('Post'); 

module.exports = { 
 //functions
 loginUser: function(req, res){
   console.log("hi from controller");
   res.json("success")
   
 }

} 