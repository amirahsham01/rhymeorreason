const router = require("express").Router();
const User = require("../models/user.model");
const Poem = require("../models/poem.model");
const Author = require("../models/author.model");
const Chapter = require("../models/chapter.model");

router.get("/", async (request, response) => {
    try {
      //get all restaurants
      let poems = await Poem.find()
        .populate("author")
        .populate("chapter");
  
      //get all cuisines
      let chapters = await Chapter.find();
  
      // console.log(restaurants);
      response.render("poems/list", { poems, chapters });
    } catch (error) {
      console.log(error);
    }
});

router.post("/new", (request, response) => {
  //   console.log(req.body);

  let poem = new Poem(request.body);
  console.log(poem);
  poem.author = request.author._id;
  //save restaurant first
  poem
    .save()
    .then(() => {
      //poem : { _id: , author: , title : ,}
      //if saved then save user
      Author.findById(poem.author).then((author) => {
        //push into poems array in author model
        author.poems.push(poem._id);

        author.save().then(() => {
          //if sucess redirect to home page
          response.redirect("/");
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/new", async (request, response) => {
  try {
    let authors = await Author.find();
    let chapters = await Chapter.find();

    response.render("poems/new", { authors, chapters });
  } catch (error) {
    console.log(error);
  }

  //   Author.find() //[]
  //     .then((authors) => {
  //       //author = {} authors = []
  //       //   console.log(authors);
  //       //to find all chapters
  //       // Chapter.find() //[]
  //       //   .then((chapters) => {
  //       //       console.log(authors);
  //       response.render("poems/new", { authors, chapters });
  //       //   })
  //       //   .catch((err) => {
  //       //     console.log(err);
  //       //   });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
});

module.exports = router;