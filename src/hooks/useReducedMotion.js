'use client'

import { useEffect, useState } from 'react'
import { REDUCED_MOTION_EVENT, readReducedMotionPreference } from '@/lib/theme.js'

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const update = () => setPrefersReducedMotion(readReducedMotionPreference())
    update()

    const mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    mediaQuery?.addEventListener('change', update)
    document.addEventListener(REDUCED_MOTION_EVENT, update)

    const handleStorage = (event) => {
      if (event.key === 'reducedMotion') update()
    }
    window.addEventListener('storage', handleStorage)

    return () => {
      mediaQuery?.removeEventListener('change', update)
      document.removeEventListener(REDUCED_MOTION_EVENT, update)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  return prefersReducedMotion
}
