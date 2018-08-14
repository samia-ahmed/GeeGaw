var mongoose = require("mongoose"), 
  Schema = mongoose.Schema, 
  UserSchema = new Schema({ 

    id: Number,
    name: String, 
    email: String,
    username: String,
    password: String,
    followers: [], 
    following: [],
    likes: [],
    posts: []

  }) 

mongoose.model('User', UserSchema); 