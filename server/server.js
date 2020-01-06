const express = require('express')
const Song = require('./models/Song')
const Setlist = require('./models/Setlist')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log(`Express ready on ${PORT}`))

// app.use(AuthHandler);
// app.use(bodyParser.json());

app.get('/songs', (req, res) => {
  Song.find()
    .then(songs => {
      const sortedSongs = songs.sort((a, b) =>
        a.optimizedMetaData && b.optimizedMetaData
          ? a.optimizedMetaData.title > b.optimizedMetaData.title
            ? 1
            : -1
          : -1
      )
      res.json(sortedSongs)
    })
    .catch(err => res.json(err))
})

app.post('/songs', (req, res) => {
  Song.create(req.body)
    .then(song => res.json(song))
    .catch(err => res.json(err))
})

app.get('/setlists', (req, res) => {
  Setlist.find()
    .populate('songs')
    .then(setlists => res.json(setlists))
    .catch(err => res.json(err))
})

app.post('/setlist', (req, res) => {
  Setlist.create(req.body)
    .then(setlist => res.json(setlist))
    .catch(err => res.json(err))
})

app.patch('/setlists/:id', (req, res) => {
  Setlist.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate('songs')
    .then(spot => res.json(spot))
    .catch(err => res.json(err))
})

module.exports = app
