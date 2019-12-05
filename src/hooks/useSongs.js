import { useState, useEffect } from 'react'
import { getSongs } from '../services'

export default function useSongs() {
  const [songs, setSongs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [displayedSong, setDisplayedSong] = useState(songs[0])

  useEffect(() => {
    getSongs().then(loadedSongs => {
      setSongs(loadedSongs)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    setDisplayedSong(songs[0])
  }, [songs])
  return { songs, setSongs, isLoading, displayedSong, setDisplayedSong }
}
