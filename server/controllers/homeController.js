var mongoose = require("mongoose"),
  User = mongoose.model('User'),
  Post = mongoose.model('Post');

module.exports = {
  //login-reg component functions
  registerUser: function (req, res) {
    User.findOne({ username: req.body.newUsername }, function (err, user) {
      //need to check email if no username exists
      if (!user) {
        User.create({ username: req.body.newUsername, password: req.body.newPassword, firstname: req.body.first_name, lastname: req.body.last_name, email: req.body.email }, function (err, newuser) {
          req.session.user = newuser;
          return res.json(newuser)
        })
      } else {
        return res.json(null)
      }
    })
  },
  login: function (req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {
      if (!user || err) {
        return res.json();
      }
      console.log("submitted password:", req.body.password, "| db password:", user.password)
      if (user.password == req.body.password) {
        req.session.user = user;
        return res.json(user)
      };
      return res.json();
    })
  },
  //dashboard component functions
  updateFeed: function(req,res){
    console.log('in controller')
    User.findOne({_id:req.session.user._id}).exec(function(err,user){
      //need to add user.following._post to return
      console.log("user:",user);
      let feed = user._post;
      user.following.map(f => {
        f.map(p => feed.push(p))
      })
      //need to sort by created_at
      console.log("feed:",feed)
      return res.json(feed);
  })
  },
  //create component functions
  newPost: function (req, res) {
    User.findOne({ _id: req.session.user._id }, function (err, user) {
      Post.create({ caption: req.body.caption, creator: user }, function (err, post) {
        user._post.push((post._id))
        user.save()
        return res.json(post)
      })
    })
  },
  //general functions
  logout: function (req, res) {
    req.session.destroy();
    res.redirect('/');
  },
  checkSess: function (req, res) {
    if (req.session.user == undefined) {
      return res.json(null)
    }
    return res.json({ user: req.session.user })
  }
} 