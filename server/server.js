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
    .then(songs => res.json(songs))
    .catch(err => res.json(err))
})

app.get('/songs/:id', (req, res) => {
  Song.findById(req.params._id)
    .then(song => res.json(song))
    .catch(err => res.json(err))
})
