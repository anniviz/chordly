import { useState, useEffect } from 'react'
import { getSetlists } from '../services'

export default function useSongs() {
  const [setlists, setSetlists] = useState([])
  const [setlistsIsLoading, setSetlistsIsLoading] = useState(true)
  const [activeSetlist, setActiveSetlist] = useState('')

  useEffect(() => {
    getSetlists().then(loadedSetlists => {
      setSetlists(loadedSetlists)
      setSetlistsIsLoading(false)
    })
  }, [])

  return {
    setlists,
    setSetlists,
    setlistsIsLoading,
    setSetlistsIsLoading,
    activeSetlist,
    setActiveSetlist,
  }
}
