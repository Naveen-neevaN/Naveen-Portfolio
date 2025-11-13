import { useEffect, useRef, useState, useCallback } from 'react'

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
  const prefersReducedMotionRef = useRef(false)

  // Memoize reduced motion check to avoid re-reads
  const readPref = useCallback(() => {
    try {
      if (typeof document !== 'undefined' && document.documentElement.classList.contains('reduced-motion')) return true
      const saved = typeof window !== 'undefined' ? localStorage.getItem('reducedMotion') : null
      if (saved === 'true') return true
    } catch (e) {
      // ignore
    }
    if (typeof window !== 'undefined' && window.matchMedia) return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return false
  }, [])

  // Single setup effect for reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return

    const initial = readPref()
    setPrefersReducedMotion(initial)
    prefersReducedMotionRef.current = initial

    // Debounced handler for preference changes
    let timeoutId
    const handleChange = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const newPref = readPref()
        if (prefersReducedMotionRef.current !== newPref) {
          setPrefersReducedMotion(newPref)
          prefersReducedMotionRef.current = newPref
        }
      }, 100)
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    mediaQuery.addEventListener('change', handleChange)
    window.addEventListener('storage', handleChange)

    return () => {
      clearTimeout(timeoutId)
      mediaQuery.removeEventListener('change', handleChange)
      window.removeEventListener('storage', handleChange)
    }
  }, [readPref])

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
