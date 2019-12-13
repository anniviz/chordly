const mongoose = require('mongoose')

const setlistSchema = {
  setlistName: String,
  songs: [String],
  createdAt: Date,
  dueDate: Date,
}

module.exports = mongoose.model('Setlist', setlistSchema)
