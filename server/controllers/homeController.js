var mongoose = require("mongoose"),
  User = mongoose.model('User'),
  Post = mongoose.model('Post');

let feed = [];

module.exports = {
  //login-reg component functions
  registerUser: function (req, res) {
    User.findOne({ username: req.body.newUsername }, function (err, user) {
      if (err) {
        console.log("error:", err);
        for (let key in err.errors) {
          req.flash('registration', err.errors[key].message)
        }
        res.redirect('/');
      }
      if (!user) {
        User.findOne({ email: req.body.email }, function (err, user2) {
          if (!user2) {
            User.create({ username: req.body.newUsername, password: req.body.newPassword, firstname: req.body.first_name, lastname: req.body.last_name, email: req.body.email }, function (err, newuser) {
              req.session.user = newuser;
              return res.json(newuser);
            });
          } else {
            return res.json(null)
          }
        })
      } else {
        return res.json(null)
      }
    })
  },

  login: function (req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {
      if (err) { return console.log(err) };
      if (!user) {
        return res.json(null);
      }
      console.log("submitted password:", req.body.password, "| db password:", user.password)
      if (user.password == req.body.password) {
        req.session.user = user;
        return res.json(user)
      };
      return res.json(null);
    })
  },
  //dashboard component functions
  updateFeed: function (req, res) {
    Post.find({creator:req.session.user._id}).populate('creator').exec(function(err,myposts){
      for(posts of myposts){
        feed.push(posts)
      }
      User.findOne({_id:req.session.user._id}).populate("following").exec(function(err,user){
        console.log("inside User function")
        for(let friend of user.following){
          console.log("inside outer loop")
          Post.find({creator:friend._id}).populate('creator').exec(function(err,friendposts){
            console.log("inside Post function (inside outer-loop)")
            // console.log(friend.username,"'s posts",friendposts)
            for(p of friendposts){
              console.log("inside inner loop")
              feed.push(p)
            }
            console.log("after inner loop, inside Post Function")
            // res.json(feed)
          })
          console.log("back to outer loop")
        }
        console.log("res.json")
      })
    })
  },
  //search component functions
  allUsers: function (req, res) {
    User.find({}, function (err, users) {
      if (err) { return console.log(err) };
      return res.json({ users: users })
    })
  },
  follow: function (req, res) { //need to look at this function and models to figure out why only the id is being saved to the model, not the whole object. 
    console.log("id:", req.params.id)
    User.findOne({ _id: req.session.user._id }).populate('following').exec(function (err, user) {
      if (err) { return console.log(err) };
      User.findOne({ _id: req.params.id }).populate('followers').exec(function (error, other) {
        if (error) { return console.log(error) };
        user.following.push(other._id);
        user.save()
        other.followers.push(user._id);
        other.save()
        console.log("user:", user, "||| other user:", other)
        res.json()
      })
    })
  },
  //create component functions
  newPost: function (req, res) {
    // console.log("image", req.body.image)
    //post validations go here
    User.findOne({ _id: req.session.user._id }).populate('posts').exec(function (err, user) {
      if (err) { return console.log(err) };
      Post.create({ caption: req.body.caption, image: req.body.image, creator: user._id }, function (error, post) {
        if (error) { return console.log(error) };
        // console.log("newPost-post:", post);
        // console.log("                                   ")
        user.posts.push(post._id)
        user.save()
        // console.log("newPost-UPDATED user:", user)
        return res.json(user)
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