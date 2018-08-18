var mongoose = require("mongoose"), 
  Schema = mongoose.Schema, 
  UserSchema = new Schema({ 
    firstname: String,
    lastname:String,
    email: String,
    username: String,
    password: String,
    followers: [{type: Schema.Types.ObjectId, ref: "Followers"}], 
    following: [{type: Schema.Types.ObjectId, ref: "Following"}],
    likes: [{type: Schema.Types.ObjectId, ref: "Likes"}],
    _post: [{type: Schema.Types.ObjectId, ref: "Posts"}]
  },{usePushEach:true}) 

mongoose.model('User', UserSchema); 