const router = require("express").Router();
const Poem = require("../models/poem.model");
const Chapter = require("../models/chapter.model");

router.get("/", async (request, response) => {
    try {
      //get all poems
      let poems = await Poem.find()
        .populate("chapter");
  
      //get all chapters
      let chapters = await Chapter.find();
  
      response.render("poems/list", { poems, chapters });
    } catch (error) {
      console.log(error);
    }
});

router.post("/new", (request, response) => {
  //   console.log(req.body);

  let poem = new Poem(request.body);
  console.log(poem);
  // poem.chapter = request.chapter._id;
  //save poem first
  poem
    .save()
    .then(() => {
      //poem : { _id: , chapter: , name : ,}
      //if saved then save user
      Chapter.findById(poem.chapter).then((chapter) => {
        //push into poems array in chapter model
        chapter.poems.push(poem._id);

        chapter.save().then(() => {
          //if success redirect to home page
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
    let chapters = await Chapter.find();

    response.render("poems/new", { chapters });
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