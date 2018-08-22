const express = require("express"),
  app = express(),
  path = require("path"),
  bP = require("body-parser"),
  port = process.env.PORT || 8001,
  dotenv = require("dotenv").config(),
  session = require("express-session");

// let multer = require('multer');
// // set the directory for the uploads to the uploaded to
// let DIR = './uploads/';
// //define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
// let upload = multer({ dest: DIR }).single('photo');

app.use(express.static(path.join(__dirname, "/client/dist/client")));
app.use(bP.json());
app.use(session({ secret: process.env.secret_key, saveUninitialized: true }));

//comment out until mongoose & routes files are built else error 
require("./server/config/mongoose.js");
require("./server/config/routes.js")(app); //importing app and running it immediately 

app.listen(port, function () {
  console.log("listening on port 8001");
});