var mongoose = require("mongoose"), 
  Schema = mongoose.Schema, 
  UserSchema = new Schema({ 
    firstname: {type:String,required:true},
    lastname:{type:String,required:true},
    email: {type:String,required:true},
    username: {type:String,required:true},
    password: {type:String,required:true},
    followers: [{type: Schema.Types.ObjectId, ref: "User"}], 
    following: [{type: Schema.Types.ObjectId, ref: "User"}],
    likes: [{type: Schema.Types.ObjectId, ref: "Post"}],
    posts: [{type: Schema.Types.ObjectId, ref: "Post"}]
  },{usePushEach:true}) 

mongoose.model('User', UserSchema); 
