var mongoose = require("mongoose"),
  User = mongoose.model('User'),
  Post = mongoose.model('Post');

module.exports = {
  //login-reg component functions
  registerUser: function (req, res) {
    User.findOne({ username: req.body.newUsername },function(err, user){
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
    console.log('in controller')
    User.findOne({ _id: req.session.user._id }).exec(function (err, user) {
      console.log("feed:", user._post)
      let feed = user._post;
      for(let following of user.following){
        console.log("following-posts",following) //this is just an id, not an object. Why? Need to link to object and following two lines will work
        // for(let post of following._post){
        //   feed.push(post);
        // }
      }
      console.log("controller-feed:",feed);
      return res.json(feed); 
    })
  },
  //search component functions
  allUsers: function (req, res) {
    User.find({}, function (err, users) {
      return res.json({ users: users })
    })
  },
  follow: function (req, res) { //need to look at this function and models to figure out why only the id is being saved to the model, not the whole object. 
    console.log("id:", req.params.id)
    User.findOne({ _id: req.session.user._id }, function (err, user) {
      User.findOne({ _id: req.params.id }, function (err, other) {
        user.following.push(other);
        user.save()
        other.followers.push(user);
        other.save()
        console.log("user:", user, "||| other user:", other)
        res.json()
      })
    })
  },
  //create component functions
  newPost: function (req, res) {
    console.log("image", req.body.image)
    User.findOne({ _id: req.session.user._id }, function (err, user) {
      Post.create({ caption: req.body.caption, image: req.body.image, creator: user }, function (err, post) {
        // post.img.data = fs.readFileSync(req.files.userPhoto.path)
        // post.img.contentType = 'image/png' || 'image/jpg';
        user._post.push((post))
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