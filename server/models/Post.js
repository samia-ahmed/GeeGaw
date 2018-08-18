var mongoose = require("mongoose"), 
  Schema = mongoose.Schema, 
  PostSchema = new Schema({ 
    caption: String,
    image: { data: Buffer, contentType: String },
    likers: [{type: Schema.Types.ObjectId, ref: "Likers"}],
    creator: {type: Schema.Types.ObjectId, ref: "Creator"}
  },{timestamps:true, usePushEach:true}) 

mongoose.model('Post', PostSchema); 