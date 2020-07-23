const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const poemSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
    },
});

const Poem = mongoose.model("Poem", poemSchema);
module.exports = Poem;
