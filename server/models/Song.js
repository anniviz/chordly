const mongoose = require("mongoose");

const songSchema = {
  title: String,
  question: String,
  answer: String,
  tags: [String],
  isBookmarked: Boolean
};

module.exports = mongoose.model("Song", songSchema);
