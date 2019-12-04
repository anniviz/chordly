const mongoose = require('mongoose')

const songSchema = {
  lines: [
    {
      items: [
        {
          chords: String,
          lyrics: String,
          _name: String,
          _originalName: String,
          _value: String,
        },
      ],
      type: String,
      currentChordLyricsPair: { chords: String, lyrics: String },
    },
  ],
  paragraphs: [
    {
      items: [
        {
          chords: String,
          lyrics: String,
          _name: String,
          _originalName: String,
          _value: String,
        },
      ],
      type: String,
      currentChordLyricsPair: { chords: String, lyrics: String },
    },
  ],
  currentLine: {
    items: [
      {
        chords: String,
        lyrics: String,
        _name: String,
        _originalName: String,
        _value: String,
      },
    ],
    type: String,
    currentChordLyricsPair: { chords: String, lyrics: String },
  },
  currentParagraph: {
    lines: [
      {
        items: [
          {
            chords: String,
            lyrics: String,
            _name: String,
            _originalName: String,
            _value: String,
          },
        ],
        type: String,
        currentChordLyricsPair: { chords: String, lyrics: String },
      },
    ],
  },
  rawMetaData: { title: Object, artist: Object, key: Object },
  optimizedMetaData: { title: String, artist: String, key: String },
}

module.exports = mongoose.model('Song', songSchema)
