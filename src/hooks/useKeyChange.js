import { useState } from 'react'

export default function useSideLists() {
  const [keyCounter, setKeyCounter] = useState(0)

  return {
    keyCounter,
    setKeyCounter,
  }
}
