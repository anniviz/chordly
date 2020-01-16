const express = require('express')
const Song = require('./models/Song')
const Setlist = require('./models/Setlist')
const mongoose = require('mongoose')
const path = require('path')

const {
  MONGODB_URI = 'mongodb://localhost:27017/songnet',
  PORT = 3333,
} = process.env

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, '../build')))

app.listen(PORT, () => console.log(`Express ready on ${PORT}`))

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

app.get('*', (req, res) => {
  res.render(path.join(__dirname, '/build/index.html'))
})
