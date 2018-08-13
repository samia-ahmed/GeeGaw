let mongoose = require("mongoose"), 
  path = require("path"), 
  fs = require("fs"), //file system, allows us to read or write files 
  mp = path.join(__dirname, './../models'); //mp = models path 
 
mongoose.connect('mongodb://localhost/instaproj_db');  

fs.readdirSync(mp).forEach(function(file){ 
  if(file.indexOf('.js') >= 0){ 
    require(mp + '/' + file) 
  } 
}) 