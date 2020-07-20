const router = require("express").Router();
const User = require("../models/user.model");
const passport = require("../lib/passportConfig");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.get("/register", (request, response) => {
  response.render("auth/register");
});

router.post("/register", async (request, response) => {
    try {
        let { firstname, lastname, email, password } = request.body;
    
        //hash password dont save password in plain text
        let hashedPassword = await bcrypt.hash(password, saltRounds);
        let user = new User({
          firstname,
          lastname,
          email,
          password: hashedPassword,
        });

        let savedUser = await user.save();
    
        if (savedUser) {
            request.flash("success", "Welcome new reader! Please log in to proceed.");
            response.redirect("/user/login");
        }
    } catch (error) {
        console.log(error);
    }
});

router.get("/login", (request, response) => {
  response.render("auth/login");
});

//-- Login Route
router.post("/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard", //after login success
    failureRedirect: "/user/login", //if fail
    failureFlash: "Invalid Username or Password",
    successFlash: "You have logged In!"
  })
);

//--- Logout Route
router.get("/logout", (request, response) => {
  request.logout(); //clear and break session
  request.flash("success", "Dont leave please come back!");
  response.redirect("/user/login");
});

module.exports = router;
