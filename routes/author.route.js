const router = require("express").Router();
const Author = require("../models/author.model");
const { request, response } = require("express");

router.get("/", async (request, response) => {
  try {
    let authors = await Author.find();

    response.render("authors/new", { authors });
  } catch (error) {
    console.log(authors);
  }
});


router.get("/:id", (request, response) => {
  Author.findById(request.params.id)
    .populate("poems")
    // .populate({
    //   //deep population
    //   path: "restaurants",
    //   //   populate: {
    //   //     path: "cuisines",
    //   //   },
    // })
    .then((author) => {
      response.send(author);
    });
});

module.exports = router;
