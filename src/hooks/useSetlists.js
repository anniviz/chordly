import { useState, useEffect } from 'react'
import { getSetlists } from '../services'

export default function useSongs() {
  const [setlists, setSetlists] = useState([])
  const [setlistsIsLoading, setSetlistsIsLoading] = useState(true)
  const [activeSetlist, setActiveSetlist] = useState('')
  const [setlistSongs, setSetlistSongs] = useState([])
  // const [updateSetlist, setUpdateSetlist] = useState(false)

  useEffect(() => {
    getSetlists().then(loadedSetlists => {
      setSetlists(loadedSetlists)
      setSetlistsIsLoading(false)
    })
  }, [])

  // useEffect(() => {
  //   setSetlistsIsLoading(true)
  //   getSetlists().then(loadedSetlists => {
  //     setSetlists(loadedSetlists)
  //     setSetlistsIsLoading(false)
  //   })
  // }, [updateSetlist])

  useEffect(() => {
    console.log('change active setlist')
    setSetlistSongs([])
  }, [activeSetlist])

  return {
    setlists,
    setSetlists,
    setlistsIsLoading,
    setSetlistsIsLoading,
    activeSetlist,
    setActiveSetlist,
    setlistSongs,
    setSetlistSongs,
  }
}
