var mongoose = require("mongoose"),
  User = mongoose.model('User'),
  Post = mongoose.model('Post');

module.exports = {
  //functions
  registerUser: function (req, res) {
    //if user already exists, return
    // if (User.findOne({ username: req.body.username })){
    //   return res.json();
    // }
    User.create({ username: req.body.newUsername, password: req.body.newPassword,  first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email}, function (err, newuser) {
      req.session.username = newuser.username;
      return res.json({ username: req.session.username })
    })
  },
  login: function (req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {
      if(!user || err){ 
        return res.json();
      }
      if (user.password == req.body.password) {
        req.session.username = req.body.username;
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
    if (req.session.username == undefined) {
      return res.json({ username: null })
    }
    return res.json({ username: req.session.username })
  }

} 