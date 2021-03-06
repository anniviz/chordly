import { useState } from 'react'

export default function useSideLists() {
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
