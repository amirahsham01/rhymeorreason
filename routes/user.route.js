const router = require("express").Router();
const passport = require("../lib/passportConfig");
const User = require("../models/user.model");
const Poem = require("../models/poem.model");

router.get("/register", (request, response) => {
  response.render("auth/register");
});

router.post("/register", (request, response) => {
  let user = new User(request.body);
  console.log(user);

  user
    .save()
    .then(() => {
      passport.authenticate("local", {
        successRedirect: "/dashboard/index", //after login success
        successFlash: "You have logged In!"
      })(request, response);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/login", (request, response) => {
  response.render("auth/login");
});

//-- Login Route
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard/index", //after login success
    failureRedirect: "/auth/login", //if fail
    failureFlash: "Invalid Username or Password",
    successFlash: "You have logged In!"
  })
);

//--- Logout Route
router.get("/logout", (request, response) => {
  request.logout(); //clear and break session
  request.flash("success", "Dont leave please come back!");
  response.redirect("/auth/login");
});

module.exports = router;
