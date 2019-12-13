const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const Song = require('./models/Song')

// const Song = mongoose.model('Post', PostSchema, 'posts');
//   const User = mongoose.model('User', UserSchema, 'users');

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
