import { useState, useEffect } from 'react'
import { getSongs } from '../services'

export default function useSongs() {
  const [songs, setSongs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [swipeIndex, setSwipeIndex] = useState(0)
  const [keyCounter, setKeyCounter] = useState(0)
  const [changeKeyDirection, setchangeKeyDirection] = useState('')

  useEffect(() => {
    getSongs().then(loadedSongs => {
      setSongs(loadedSongs)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    setSwipeIndex(0)
  }, [songs])

  useEffect(() => {
    setKeyCounter(0)
  }, [swipeIndex])

  return {
    songs,
    setSongs,
    isLoading,
    swipeIndex,
    setSwipeIndex,
    keyCounter,
    setKeyCounter,
    changeKeyDirection,
    setchangeKeyDirection,
  }
}
