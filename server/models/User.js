var mongoose = require("mongoose"), 
  Schema = mongoose.Schema, 
  UserSchema = new Schema({ 
    firstname: {type:String,required:true}, //This is saying that this field cannot be blank when creating it, if the user doesn't enter a name it will trigger an error and not create the object
    lastname:{type:String,required:true},
    email: {type:String,required:true},
    username: {type:String,required:true},
    password: {type:String,required:true},
    followers: [{type: Schema.Types.ObjectId, ref: "User"}], //this is saying there will be an array populate by Schemas, referenced by their ObjectIDs. it will be User schemas in this case.
    following: [{type: Schema.Types.ObjectId, ref: "User"}],
    likes: [{type: Schema.Types.ObjectId, ref: "Post"}], //this is saying there will be an array populate by Schemas, referenced by their ObjectIDs. it will be Post schemas in this case.
    posts: [{type: Schema.Types.ObjectId, ref: "Post"}]
  },{usePushEach:true}) 

mongoose.model('User', UserSchema); 
