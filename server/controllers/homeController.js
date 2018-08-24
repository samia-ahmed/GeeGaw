var mongoose = require("mongoose"),
  User = mongoose.model('User'),
  Post = mongoose.model('Post');

let feed = []; //attempt at a global variable to try to cheat the scope puzzle of the updateFeed function, didn't work, can delete and redefine in updateFeed function

module.exports = {
  //login-reg component functions:
  registerUser: function (req, res) {
    // check if the entered username already exists
    User.findOne({ username: req.body.newUsername }, function (err, user) {
      if (err) {
        console.log("error:", err);
        for (let key in err.errors) {
          req.flash('registration', err.errors[key].message)
        }
        res.redirect('/');
      }
      //if it doesn't, check if the entered email already exists
      if (!user) {
        User.findOne({ email: req.body.email }, function (err, user2) {
          if (!user2) {
            //if there is no email or username matching, then create a new user
            User.create({ username: req.body.newUsername, password: req.body.newPassword, firstname: req.body.first_name, lastname: req.body.last_name, email: req.body.email }, function (err, newuser) {
              req.session.user = newuser;
              return res.json(newuser);
            });
          } else {
            //if there is an existing email that matches the entered email, return null, if the return is null, the function in the service/component will trigger an error message
            return res.json(null)
          }
        })
      } else {
        //if username already exists, return null, triggering error in component/service
        return res.json(null)
      }
    })
  },

  login: function (req, res) {
    //check if there is the entered username in the database
    User.findOne({ username: req.body.username }, function (err, user) {
      if (err) { return console.log(err) };
      if (!user) {
        //if there, isn't, we can't log in
        return res.json(null);
      }
      console.log("submitted password:", req.body.password, "| db password:", user.password)
      //if there is, we need to check the password
      if (user.password == req.body.password) {
        //if the passwords match, log in
        req.session.user = user;
        return res.json(user)
      };
      //if the password doesn't match, returning null will trigger an error in component. 
      return res.json(null);
    })
  },

  //dashboard component functions:
  updateFeed: function (req, res) {
    //find all posts by current user and add them to the feed array
    Post.find({creator:req.session.user._id}).populate('creator').exec(function(err,myposts){
      for(post of myposts){
        feed.push(post)
      }
      res.json(feed)

      //cluster fuck follows

      // User.findOne({_id:req.session.user._id}).populate("following").exec(function(err,user){
      //   console.log("inside User function")
      //   for(let friend of user.following){
      //     console.log("inside outer loop")
      //     Post.find({creator:friend._id}).populate('creator').exec(function(err,friendposts){
      //       console.log("inside Post function (inside outer-loop)")
      //       // console.log(friend.username,"'s posts",friendposts)
      //       for(p of friendposts){
      //         console.log("inside inner loop")
      //         feed.push(p)
      //       }
      //       console.log("after inner loop, inside Post Function")
      //       // res.json(feed)
      //     })
      //     console.log("back to outer loop")
      //   }
      //   console.log("res.json")
      // })
    })
  },

  //search component functions:
  allUsers: function (req, res) {
    //get all users
    User.find({}, function (err, users) {
      if (err) { return console.log(err) };
      return res.json(users)
    })
  },
  follow: function (req, res) { 
    console.log("id:", req.params.id) //make sure we're getting the user ID we want to follow
    User.findOne({ _id: req.session.user._id }).exec(function (err, user) { //may need to add .populate('following')
      //grab the current user so we can update his "following" array
      if (err) { return console.log(err) };
      User.findOne({ _id: req.params.id }).exec(function (error, other) { //may need to add .populate('followers')
        //grab the targeted user we want to follow so we can update his "follower" array
        if (error) { return console.log(error) };
        user.following.push(other._id); //update current user's following array
        user.save()
        other.followers.push(user._id); //update targeted user's followers array
        other.save()
        console.log("user:", user, "||| other user:", other)
        res.json()
      })
    })
  },

  //create component functions:
  newPost: function (req, res) {
    // console.log("image", req.body.image) //I want to see what image data looks like when we enable upload, ignore for now
    //post validations will go here
    User.findOne({ _id: req.session.user._id }).populate('posts').exec(function (err, user) {
      //grab the current user
      if (err) { return console.log(err) };
      Post.create({ caption: req.body.caption, image: req.body.image, creator: user._id }, function (error, post) {
        //create the post, and save the post to the current users array of their posts
        if (error) { return console.log(error) };
        user.posts.push(post._id)
        user.save()
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
      //if there is no session, no one is logged in. returning null will trigger redirect in component 
      return res.json(null)
    }
    return res.json({ user: req.session.user })
  }
} 