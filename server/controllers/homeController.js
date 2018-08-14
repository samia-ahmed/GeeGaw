var mongoose = require("mongoose"), 
  User = mongoose.model('User'), 
  Post = mongoose.model('Post'); 

module.exports = { 
 //functions
 loginUser: function(){
   console.log("at the controller");
   
 }

} 