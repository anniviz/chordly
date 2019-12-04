import { useState, useEffect } from 'react'
import { getSongs } from '../services'

export default function useSongs() {
  const [songs, setSongs] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getSongs().then(loadedSongs => {
      setSongs(loadedSongs)
      setIsLoading(false)
    })
  }, [])
  return { songs, setSongs, isLoading }
}
