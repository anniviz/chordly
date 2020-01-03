import { useState, useEffect } from 'react'
import { getSongs } from '../services'

export default function useSongs() {
  const [songs, setSongs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [swipeIndex, setSwipeIndex] = useState(0)
  const [fuzzySearchResult, setFuzzySearchResult] = useState(songs)

  useEffect(() => {
    getSongs().then(loadedSongs => {
      setSongs(loadedSongs)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    setSwipeIndex(0)
  }, [songs])

  return {
    songs,
    setSongs,
    isLoading,
    swipeIndex,
    setSwipeIndex,
    fuzzySearchResult,
    setFuzzySearchResult,
  }
}
