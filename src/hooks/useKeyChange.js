import { useState, useEffect } from 'react'
import useSongs from './useSongs'

export default function useSideLists() {
  const { swipeIndex } = useSongs()
  const [keyCounter, setKeyCounter] = useState(0)
  const [changeKeyDirection, setchangeKeyDirection] = useState('')

  useEffect(() => {
    setKeyCounter(0)
  }, [swipeIndex])

  return {
    keyCounter,
    setKeyCounter,
    changeKeyDirection,
    setchangeKeyDirection,
  }
}
