import { useEffect, useRef, useState } from 'react'

const defaultOptions = {
  threshold: 0.18,
  rootMargin: '0px',
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
    if (typeof window === 'undefined') return

    const readPref = () => {
      try {
        if (typeof document !== 'undefined' && document.documentElement.classList.contains('reduced-motion')) return true
        const saved = typeof window !== 'undefined' ? localStorage.getItem('reducedMotion') : null
        if (saved === 'true') return true
      } catch (e) {
        // ignore
      }
      if (typeof window !== 'undefined' && window.matchMedia) return window.matchMedia('(prefers-reduced-motion: reduce)').matches
      return false
    }

    setPrefersReducedMotion(readPref())

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => setPrefersReducedMotion(readPref())
    mediaQuery.addEventListener('change', handleChange)
    document.addEventListener('reduced-motion-change', handleChange)
    const handleStorage = (e) => {
      if (e.key === 'reducedMotion') setPrefersReducedMotion(readPref())
    }
    window.addEventListener('storage', handleStorage)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      document.removeEventListener('reduced-motion-change', handleChange)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (once) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            setIsVisible(false)
          }
        })
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
