const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("./lib/passportConfig");
const isLoggedIn = require("./lib/blockCheck");
require("dotenv").config();

mongoose.Promise = Promise;

mongoose
  .connect(process.env.MONGODBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    })
    .then(() => {
      console.log("MongoDB connected!");
    })
    .catch((e) => {
      console.log(e);
});

//middleware
app.use("/public", express.static('./public/')); //look for static files in public folder
app.use(express.urlencoded({ extended: true })); //collects form data
app.set("view engine", "ejs"); //view engine setup
app.use(expressLayouts);

//must come after middleware and before routes
//this creates a session which determines how long
//communication will last
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 360000 },
  })
);

//must be after sessions
//passport initialization
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//set global variable for ejs files
//third param is mostly called next (moveOn)
app.use(function (request, response, next) {
  response.locals.alerts = request.flash();
  response.locals.currentUser = request.user;
  next();
});

//all routes
app.get("/", (request, response) => {
    response.render("poems/index");
});

app.get("/dashboard", isLoggedIn, (request, response) => {
  response.render("dashboard/index");
});

app.use("/user", require("./routes/user.route"));
app.use("/poems", isLoggedIn, require("./routes/poem.route"));
app.use("/", require("./routes/chapter.route"));

//connect to port
app.listen(process.env.PORT, () => {
    console.log(`running on PORT ${process.env.PORT}`);
});