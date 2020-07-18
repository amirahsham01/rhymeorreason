const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  favouritePoems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poem",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
