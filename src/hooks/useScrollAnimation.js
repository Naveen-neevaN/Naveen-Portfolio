import { useEffect, useRef, useState } from 'react'
import { subscribeToReducedMotionPreference } from '@/lib/theme.js'

const defaultOptions = {
  threshold: 0.08,
  rootMargin: '50px',
  once: true,
}

export const useScrollAnimation = (options = {}) => {
  const normalizedOptions =
    typeof options === 'number'
      ? { ...defaultOptions, threshold: options }
      : { ...defaultOptions, ...(options ?? {}) }

  const { threshold, rootMargin, once } = normalizedOptions

  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    return subscribeToReducedMotionPreference(setPrefersReducedMotion)
  }, [])

  // Intersection observer effect
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const element = ref.current
    if (!element) {
      return
    }

    const scheduledRef = { current: false }
    const lastDesiredRef = { current: null }

    const observer = new IntersectionObserver(
      (entries) => {
        // Determine desired visibility from batch of entries
        let anyVisible = false
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anyVisible = true
            if (once) observer.unobserve(entry.target)
          }
        })

        lastDesiredRef.current = anyVisible

        if (!scheduledRef.current) {
          scheduledRef.current = true
          // Batch updates to the next animation frame to avoid layout thrash
          window.requestAnimationFrame(() => {
            const desired = lastDesiredRef.current
            if (once) {
              // If "once" we only ever switch from false -> true
              setIsVisible((prev) => (prev ? prev : !!desired))
            } else {
              setIsVisible(!!desired)
            }
            scheduledRef.current = false
          })
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, once, prefersReducedMotion])

  return [ref, isVisible]
}
