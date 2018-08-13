var mongoose = require("mongoose"), 

  Schema = mongoose.Schema, 

  PostSchema = new Schema({ 

    id: Number,
    caption: String,
    image: { data: Buffer, contentType: String },
    likers: [],
    poster: Object

  }) 

mongoose.model('Post', PostSchema); 