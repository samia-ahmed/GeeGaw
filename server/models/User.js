var mongoose = require("mongoose"), 
  Schema = mongoose.Schema, 
  UserSchema = new Schema({ 

    id: Number,
    first_name: String,
    last_name: String, 
    email: String,
    username: String,
    password: String,
    followers: [], 
    following: [],
    likes: [],
    posts: []

  }) 

mongoose.model('User', UserSchema); 