import { useState } from 'react'

export default function useSideLists() {
  const [keyCounter, setKeyCounter] = useState(0)
  const [chankgeKeyDirection, setChankgeKeyDirection] = useState('')

  return {
    keyCounter,
    setKeyCounter,
    chankgeKeyDirection,
    setChankgeKeyDirection,
  }
}
