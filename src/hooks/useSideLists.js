import { useState, useEffect } from 'react'
import useSongs from './useSongs'

export default function useSideLists() {
  const { swipeIndex } = useSongs()

  const [isSideListShown, setIsSideListShown] = useState(false)
  const [sideListType, setSideListType] = useState('allSongs')
  const [sideListTitle, setSideListTitle] = useState('All Songs')
  const [showSearchField, setShowSearchField] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  return {
    isSideListShown,
    setIsSideListShown,
    sideListType,
    setSideListType,
    sideListTitle,
    setSideListTitle,
    showSearchField,
    setShowSearchField,
    searchInput,
    setSearchInput,
  }
}
