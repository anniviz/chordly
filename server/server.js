const express = require('express')
const Song = require('./models/Song')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/songnet', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log(`Express ready on ${PORT}`))

app.get('/songs', (req, res) => {
  Song.find()
    .then(songs => {
      console.log(songs)
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
