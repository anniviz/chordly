import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'
import { withInfo } from '@storybook/addon-info'
import Button from './Button'

export default {
  title: 'Button',
  decorators: [withKnobs, withInfo],
}

export const standard = () => (
  <Button onClick={action('clicked')}>Button</Button>
)
