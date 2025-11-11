'use client'

import { useEffect, useState } from 'react'
import './ThemeSwitch.css'

export default function MotionToggle() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('reducedMotion') : null
      const initial = saved === 'true'
      setReduced(initial)
      if (typeof document !== 'undefined') {
        if (initial) document.documentElement.classList.add('reduced-motion')
        else document.documentElement.classList.remove('reduced-motion')
      }
    } catch (e) {
      // ignore storage errors
    }
  }, [])

  const toggle = () => {
    const next = !reduced
    setReduced(next)
    try {
      if (typeof document !== 'undefined') {
        if (next) document.documentElement.classList.add('reduced-motion')
        else document.documentElement.classList.remove('reduced-motion')
      }
      if (typeof window !== 'undefined') localStorage.setItem('reducedMotion', next ? 'true' : 'false')
      // notify other components in the page so JS-driven animations can respond immediately
      if (typeof document !== 'undefined') {
        try {
          document.dispatchEvent(new CustomEvent('reduced-motion-change', { detail: { reduced: next } }))
        } catch (e) {
          // fallback
        }
      }
    } catch (e) {
      // ignore
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-switch"
      aria-pressed={reduced}
      aria-label={reduced ? 'Disable reduced motion' : 'Enable reduced motion'}
      title={reduced ? 'Reduced motion enabled' : 'Enable reduced motion'}
      style={{ fontSize: '0.95rem' }}
    >
      {reduced ? '♿︎' : '⚡'}
    </button>
  )
}
