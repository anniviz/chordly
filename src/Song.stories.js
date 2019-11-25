import React from 'react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'
import Song from './Song'

export default {
  title: 'Song',
  decorators: [withKnobs],
}

export const standard = () => (
  <Song
    title={text('Songtitle', 'This is the title of a song')}
    artist={text('Song artist', 'This is the artist of a song')}
    lyrics={text('Song lyrics', 'This are the lyrics of a song')}
  />
)
