'use client'

import { useState } from 'react'
import { personalInfo } from '@/data/personalInfo.js'
import { useScrollAnimation } from '@/hooks/useScrollAnimation.js'
import './Contact.css'

const Contact = () => {
  const [ref, isVisible] = useScrollAnimation(0.2)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({ name: '', email: '' })
  const [backendError, setBackendError] = useState('')
  const [submitAttempted, setSubmitAttempted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitAttempted(true)
    setStatus('sending')
    setBackendError('')

    // Client-side validation: name and email mandatory
    const newErrors = { name: '', email: '' }
    if (!formData.name || !formData.name.trim()) newErrors.name = 'Name is required.'
    if (!formData.email || !formData.email.trim()) newErrors.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address.'

    setErrors(newErrors)
    if (newErrors.name || newErrors.email) {
      setStatus('error')
      return
    }

    fetch('/api/storeMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: formData.name, email: formData.email, message: formData.message }),
    })
      .then(async (res) => {
        const json = await res.json().catch(() => ({}))
        if (res.ok && json.ok) {
          setStatus('success')
          setFormData({ name: '', email: '', message: '' })
          setErrors({ name: '', email: '' })
          setSubmitAttempted(false)
          setTimeout(() => setStatus('idle'), 2800)
        } else {
          console.error('storeMessage error', json)
          setBackendError(json?.error || 'Something went wrong. Please try again.')
          setStatus('error')
          // Auto-dismiss error after 3 seconds
          setTimeout(() => {
            setStatus('idle')
            setBackendError('')
          }, 3000)
        }
      })
      .catch((err) => {
        console.error('network error', err)
        setBackendError('Something went wrong. Please try again.')
        setStatus('error')
        // Auto-dismiss error after 3 seconds
        setTimeout(() => {
          setStatus('idle')
          setBackendError('')
        }, 3000)
      })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    // Real-time validation: clear error when corrected (instant disappearance)
    setErrors((prev) => {
      const next = { ...prev }
      if (name === 'name') {
        if (value && value.trim()) next.name = ''
        else next.name = 'Name is required.'
      }
      if (name === 'email') {
        if (!value || !value.trim()) next.email = 'Email is required.'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) next.email = 'Please enter a valid email address.'
        else next.email = ''
      }
      return next
    })
  }

  return (
    <section id="contact" className="contact section-padding">
      <div className="container">
        <h2 className="section-heading">Get In Touch</h2>
        <p className="section-subheading">
          Let’s collaborate to build reliable, automated, and high-quality digital solutions.
        </p>

        <div ref={ref} className={`contact__grid ${isVisible ? 'is-visible' : ''}`}>
          <div className="contact__card glass-panel">
            <span className="contact__badge glass-inline">Open for opportunities</span>
            <h3 className="contact__title gradient-text">Let’s build resilient digital experiences</h3>
            <p className="contact__description text-muted">
              I partner with global teams to architect QA accelerators, orchestrate Tosca automation, and cultivate
              seamless delivery pipelines.
            </p>

            <div className="contact__details">
              {personalInfo.phone ? (
                <div className="contact__detail">
                  <span className="contact__detail-icon" aria-hidden="true">
                    📱
                  </span>
                  <a href={`tel:${personalInfo.phone}`} className="contact__detail-value">
                    {personalInfo.phone}
                  </a>
                </div>
              ) : null}

              <div className="contact__detail">
                <span className="contact__detail-icon" aria-hidden="true">
                  ✉️
                </span>
                <a href={`mailto:${personalInfo.email}`} className="contact__detail-value">
                  {personalInfo.email}
                </a>
              </div>

              <div className="contact__detail">
                <span className="contact__detail-icon" aria-hidden="true">
                  📍
                </span>
                <a
                  className="contact__detail-value"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(personalInfo.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {personalInfo.location}
                </a>
              </div>
            </div>
          </div>

          <form className="contact__form glass-panel" onSubmit={handleSubmit} noValidate>
            <div className="contact__formRow contact__formRow--stacked">
              <div className="contact__field">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="What's your name?"
                  className={`${submitAttempted && errors.name ? 'has-error' : ''}`}
                />
                <div className={`contact__fieldError ${errors.name ? 'is-visible' : ''}`}>
                  {errors.name}
                </div>
              </div>
              <div className="contact__field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@domain.com"
                  className={`${submitAttempted && errors.email ? 'has-error' : ''}`}
                />
                <div className={`contact__fieldError ${errors.email ? 'is-visible' : ''}`}>
                  {errors.email}
                </div>
              </div>
            </div>

            <div className="contact__field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                placeholder="Share what's on your mind—ideas, opportunities, collaboration..."
                required
              />
            </div>

            <div style={{ height: '1rem' }} />

            <button type="submit" className="btn btn-primary contact__submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent' : 'Send Message'}
            </button>

            <div className="contact__status" role="status" aria-live="polite">
              {status === 'success' ? (
                <span className="contact__statusMessage contact__statusMessage--success">
                  Your message has been received successfully!
                </span>
              ) : status === 'error' ? (
                <span className="contact__statusMessage contact__statusMessage--error">
                  {backendError || 'Something went wrong. Please try again.'}
                </span>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
