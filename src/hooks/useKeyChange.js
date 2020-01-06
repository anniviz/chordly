import { useState } from 'react'

export default function useSideLists() {
  const [keyCounter, setKeyCounter] = useState(0)
  const [changeKeyDirection, setChangeKeyDirection] = useState('')

  return {
    keyCounter,
    setKeyCounter,
    changeKeyDirection,
    setChangeKeyDirection,
  }
}
