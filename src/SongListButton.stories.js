import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'
import { withInfo } from '@storybook/addon-info'
import SongListButton from './SongListButton'

export default {
  title: 'SongListButton',
  decorators: [withKnobs, withInfo],
}

export const standard = () => (
  <SongListButton onClick={action('clicked')}>Button</SongListButton>
)
