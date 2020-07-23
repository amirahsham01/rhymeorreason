const router = require("express").Router();
const Poem = require("../models/poem.model");
const Chapter = require("../models/chapter.model");
const User = require("../models/user.model");
const isLoggedIn = require("../lib/blockCheck");

router.get("/", isLoggedIn, async (request, response) => {
    try {
      let chapters = await Chapter.find();
  
      response.render("dashboard/index", { chapters });
    } catch (error) {
      console.log(error);
    }
});

module.exports = router;