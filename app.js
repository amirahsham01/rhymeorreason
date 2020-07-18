const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const session = require("express-session");
require("dotenv").config();

mongoose.connect(
    process.env.MONGODBURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    () => {
      console.log("MongoDB connected!");
    }
);

//middleware
app.use("/public", express.static('./public/')); //look for static files in public folder
app.use(express.urlencoded({ extended: true })); //collects form data
app.set("view engine", "ejs"); //view engine setup
app.use(expressLayouts);

//all routes
app.get("/", (req, res) => {
    res.render("poems/index");
});

//connect to port
app.listen(process.env.PORT, () => {
    console.log(`running on PORT ${process.env.PORT}`);
});