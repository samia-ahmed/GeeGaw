var mongoose = require("mongoose"),
  User = mongoose.model('User'),
  Post = mongoose.model('Post');

module.exports = {
  //login-reg component functions
  registerUser: function (req, res) {
    User.findOne({ username: req.body.newUsername },function(err, user){
      if(err){
        console.log("error:",err);
        for(let key in err.errors){
          req.flash('registration',err.errors[key].message)
        }
        res.redirect('/');
      }
      if(!user){
        User.findOne({ email: req.body.email },function(err, user2){
          if(!user2){
            User.create({ username: req.body.newUsername, password: req.body.newPassword, firstname: req.body.first_name, lastname: req.body.last_name, email: req.body.email }, function (err, newuser) {
              req.session.user = newuser;
              return res.json(newuser);
            });
          }else{
            return res.json(null)
          }
        })
      }else{
        return res.json(null)
      }
    })
  }, 
  
  login: function (req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {
      if (err) { return handleError(err) };
      if (!user) {
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
  updateFeed: function (req, res) {
    User.findOne({ _id: req.session.user._id }).exec(function (err, user) {
      if (err) { return handleError(err) };
      // console.log("user:", user)
      let feed = []
      for(let post of user.posts){
        feed.push(post);
      }
      // console.log(feed)
      for(let following of user.following){
        // console.log("following-posts",following) //this is just an id, not an object. Why? Need to link to object and following two lines will work
        // for(let post of following.posts){
        //   feed.push(post);
        // }
      }
      // console.log("controller-feed:",feed);
      return res.json(feed); 
    })
  },
  //search component functions
  allUsers: function (req, res) {
    User.find({}, function (err, users) {
      if (err) { return handleError(err)};
      return res.json({ users: users })
    })
  },
  follow: function (req, res) { //need to look at this function and models to figure out why only the id is being saved to the model, not the whole object. 
    console.log("id:", req.params.id)
    User.findOne({ _id: req.session.user._id }).populate('User').exec(function (err, user) {
      if (err) { return handleError(err)};
      User.findOne({ _id: req.params.id }).populate('User').exec(function (error, other) {
        if (error) { return handleError(error)};
        user.following.push(other);
        user.save()
        other.followers.push(user);
        other.save()
        console.log("user:", user, "||| other user:", other)
        res.json() //might not work
      })
    })
  },
  //create component functions
  newPost: function (req, res) {
    // console.log("image", req.body.image)
    //post validations go here
    Post.create({ caption: req.body.caption, image: req.body.image, creator: req.session.user._id},function (error, post) {
      if (error) { return handleError(error)};
      User.findOne({ _id: req.session.user._id }).populate('Post').exec(function (err, user) {
        if (err) { return handleError(err)};
        console.log("newPost-post:",post);
        console.log("                                   ")
        user.posts.push(post)
        user.save()
        console.log("newPost-UPDATED user:",user)
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