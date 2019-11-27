import React from 'react'
import { action } from '@storybook/addon-actions'
import Button from './Button'

export default {
  title: 'Button',
}

export const standard = () => (
  <Button onClick={action('clicked')}>Button</Button>
)
