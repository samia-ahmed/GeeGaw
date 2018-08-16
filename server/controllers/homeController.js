var mongoose = require("mongoose"),
  User = mongoose.model('User'),
  Post = mongoose.model('Post');

module.exports = {
  //functions
  loginUser: function (req, res) {
    console.log("hi from controller", req.body.username, req.body.password);
    User.create({ username: req.body.username, password: req.body.password }, function (err, user) {
      console.log("user:", user)
      req.session.username = user.username;
      console.log("session-user:", req.session.username)
      return res.json({ username: req.session.username, })
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