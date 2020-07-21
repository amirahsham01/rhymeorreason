const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chapterSchema = Schema({
  name: {
    type: String,
  },
  poems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poem",
    },
  ],
});

const Chapter = mongoose.model("Chapter", chapterSchema);
module.exports = Chapter;