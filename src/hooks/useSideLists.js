import { useState } from 'react'

export default function useSideLists() {
  const [isSideListShown, setIsSideListShown] = useState(false)
  const [isAllSongsShown, setIsAllSongsShown] = useState(false)

  return {
    isSideListShown,
    setIsSideListShown,
    isAllSongsShown,
    setIsAllSongsShown,
  }
}
