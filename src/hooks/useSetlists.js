import { useState, useEffect } from 'react'
import { getSetlists } from '../services'

export default function useSongs() {
  const [setlists, setSetlists] = useState([])
  const [setlistsIsLoading, setSetlistsIsLoading] = useState(true)
  const [activeSetlist, setActiveSetlist] = useState('')
  const [setlistSwipeIndices, setSetlistSwipeIndices] = useState([])

  useEffect(() => {
    getSetlists().then(loadedSongs => {
      setSetlists(loadedSongs)
      setSetlistsIsLoading(false)
    })
  }, [])

  return {
    setlists,
    setSetlists,
    setlistsIsLoading,
    activeSetlist,
    setActiveSetlist,
    setlistSwipeIndices,
    setSetlistSwipeIndices,
  }
}
