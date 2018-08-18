var mongoose = require("mongoose"),
  User = mongoose.model('User'),
  Post = mongoose.model('Post');

module.exports = {
  //functions
  registerUser: function (req, res) {
    //if user already exists, return
    User.findOne({ username: req.body.newUsername }, function (err, user) {
      //need to check email if no username exists
      if(!user){
        User.create({ username: req.body.newUsername, password: req.body.newPassword,  first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email}, function (err, newuser) {
          console.log("creating user",newuser)
          req.session.user = newUser;
          return res.json(newuser)
        })
      }else{
        console.log("user already exists",user)
        return res.json(null)
      }
    })
  },
  login: function (req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {
      if(!user || err){ 
        return res.json();
      }
      console.log("submitted password:",req.body.password,"| db password:",user.password)
      if (user.password == req.body.password) {
        req.session.user = user;
        return res.json(user)
      };
      return res.json();
    })
  },
  logout: function (req, res) {
    req.session.destroy();
    res.redirect('/');
  },
  checkSess: function (req, res) {
    console.log("in ctrl, sess")
    if (req.session.user == undefined) {
      return res.json({ username: null })
    }
    return res.json({ username: req.session.user.username })
  }

} 