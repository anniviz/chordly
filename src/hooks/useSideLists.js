import { useState } from 'react'

export default function useSideLists() {
  const [isSideListShown, setIsSideListShown] = useState(false)
  const [isAllSongsShown, setIsAllSongsShown] = useState(true)
  const [isSetListsShown, setIsSetListsShown] = useState(false)
  const [isASetListsShown, setIsASetListShown] = useState(false)

  return {
    isSideListShown,
    setIsSideListShown,
    isAllSongsShown,
    setIsAllSongsShown,
    isSetListsShown,
    setIsSetListsShown,
    isASetListsShown,
    setIsASetListShown,
  }
}
