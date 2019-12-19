const mongoose = require('mongoose')

const songSchema = {
  lines: Array,
  paragraphs: Array,
  currentLine: Object,
  currentParagraph: Object,
  rawMetaData: Object,
  optimizedMetaData: Object,
}

module.exports = mongoose.model('Song', songSchema)
