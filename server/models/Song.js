const mongoose = require('mongoose')

const songSchema = {
  lines: mongoose.Schema.Types.Mixed,
  paragraphs: mongoose.Schema.Types.Mixed,
  currentLine: mongoose.Schema.Types.Mixed,
  currentParagraph: mongoose.Schema.Types.Mixed,
  rawMetaData: mongoose.Schema.Types.Mixed,
  optimizedMetaData: mongoose.Schema.Types.Mixed,
}

module.exports = mongoose.model('Song', songSchema)
