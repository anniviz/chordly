import React from 'react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'
import { withInfo } from '@storybook/addon-info'
import Song from './Song'

export default {
  title: 'Song',
  decorators: [withKnobs, withInfo],
}

export const standard = () => (
  <Song
    title={text('Songtitle', 'All Day')}
    artist={text('Song artist', 'Hillsong United')}
    lyrics={text(
      'Song lyrics',
      "{start_of_verse: Verse 1}   \n[G#m] I don't [E]care what they [B]say about [F#]me   \nIt's alright, alright   \nI don't care what they think about me   \nIt's alright, they'll get it one day   \n{end_of_verse: Verse 1}   \n   \n{start_of_chorus: Pre-Chorus}   \nI love you, I'll follow You   \nYou are my, my life   \nI will read my bible and pray   \nI will follow you all day   \n{end_of_chorus: Pre-Chorus}   \n   \n{start_of_verse: Verse 2}   \nI don't care what it costs anymore   \nCos' You gave it all and I'm following You   \nI don't care what it takes anymore   \nNo matter what happens I'm going your way   \n{end_of_verse: Verse 2}   \n   \n{start_of_chorus: Pre-Chorus}   \nPre-Chorus   \n{end_of_chorus: Pre-Chorus}   \n   \n{start_of_chorus: Chorus}   \n[B] All [E]day,[B] all [F#]day now,[B] all [E]day[G#m][E]   \n{end_of_chorus: Chorus}   \n   \n{start_of_chorus: Bridge}   \n[C#m] Any[E]one around can [C#m]see just how [E]good You've been to me   \n[C#m] For all my [E]friends that don't know [C#m]You, I pray that [E]You would save them, [B]too   \n{end_of_chorus: Bridge}"
    )}
  />
)
