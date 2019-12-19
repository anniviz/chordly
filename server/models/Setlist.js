const mongoose = require('mongoose')
const Schema = mongoose.Schema

const setlistSchema = {
  setlistName: String,
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Song',
    },
  ],
  createdAt: Date,
  dueDate: Date,
}

module.exports = mongoose.model('Setlist', setlistSchema)
