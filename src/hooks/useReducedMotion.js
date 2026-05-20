'use client'

import { useEffect, useState } from 'react'
import { subscribeToReducedMotionPreference } from '@/lib/theme.js'

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    return subscribeToReducedMotionPreference(setPrefersReducedMotion)
  }, [])

  return prefersReducedMotion
}
