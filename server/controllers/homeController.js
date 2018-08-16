var mongoose = require("mongoose"), 
  User = mongoose.model('User'), 
  Post = mongoose.model('Post'); 

module.exports = { 
 //functions
 loginUser: function(req, res){
   console.log("hi from controller");
   res.json("success")
   console.log("the info:", req.body.username, req.body.password)
   userCreated = User.create({username: req.body.username, password: req.body.password}, function(userCreated){
    req.session.user = userCreated;
    console.log("the new user", userCreated);
  })
   
 }

} 