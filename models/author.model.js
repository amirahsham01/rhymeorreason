const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  poems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poem",
    },
  ],
});

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
