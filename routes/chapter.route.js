const router = require("express").Router();
const Chapter = require("../models/chapter.model");


/* 
  @method GETT
  @route chapters/new
  @desc displays new chapters form
*/
router.get("/new", (request, response) => {
  response.render("chapters/new");
});

/* 
  @method POST
  @route /new
  @desc creates new chapters
*/
router.post("/new", (request, response) => {
  let chapter = new Chapter(request.body);

  chapter
    .save()
    .then(() => {
      response.redirect("/dashboard");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
