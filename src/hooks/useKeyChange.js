import { useState } from 'react'

export default function useSideLists() {
  const [isKeyChangeShown, SetIsKeyChangeShown] = useState(false)

  return {
    isKeyChangeShown,
    SetIsKeyChangeShown,
  }
}
