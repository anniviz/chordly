import { useState } from 'react'

export default function useSideLists() {
  const [isSideListShown, setIsSideListShown] = useState(false)
  const [sideListType, setSideListType] = useState('allSongs')

  return {
    isSideListShown,
    setIsSideListShown,
    sideListType,
    setSideListType,
  }
}
