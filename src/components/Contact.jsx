'use client'

import { useState, useEffect } from 'react'
import emailjs from 'emailjs-com'
import { personalInfo } from '@/data/personalInfo.js'
import { useScrollAnimation } from '@/hooks/useScrollAnimation.js'
import './Contact.css'

// Initialize EmailJS (free tier public key)
const EMAILJS_PUBLIC_KEY = 'haU7Ebtc2IASj_sCO'
const EMAILJS_SERVICE_ID = 'service_7jktasp'
// Two templates: admin notification (you) and optional auto-reply to visitor
const EMAILJS_TEMPLATE_ID_ADMIN = 'template_grhlujf'
const EMAILJS_TEMPLATE_ID_AUTO = 'template_psfmd3n'

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
  const [isErrorDismissing, setIsErrorDismissing] = useState(false)
  const [shakeKey, setShakeKey] = useState(0)

  useEffect(() => {
    // Initialize EmailJS on mount
    emailjs.init(EMAILJS_PUBLIC_KEY)
  }, [])

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
      setShakeKey(prev => prev + 1) // Force animation re-trigger
      setIsErrorDismissing(false)
      // Start fade-out after 2.5 seconds for validation errors too
      setTimeout(() => setIsErrorDismissing(true), 2500)
      // Auto-dismiss error after 3 seconds
      setTimeout(() => {
        setStatus('idle')
        setIsErrorDismissing(false)
      }, 3000)
      return
    }

    // Send admin notification using EmailJS
    const adminParams = {
      to_email: 'naveennagendiran321@gmail.com',
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      reply_to: formData.email,
    }

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID_ADMIN, adminParams)
      .then((response) => {
        if (process.env.NODE_ENV !== 'production') console.log('Admin email sent:', response)

        // Attempt to send auto-reply to visitor (non-blocking)
        if (EMAILJS_TEMPLATE_ID_AUTO) {
          const autoParams = {
            // template may use {{email}} or {{to_email}} to determine recipient
            to_email: formData.email,
            email: formData.email,
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            // make reply-to your address so visitor replies go to you
            reply_to: 'naveennagendiran321@gmail.com',
          }

          emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID_AUTO, autoParams)
            .then((r2) => {
              if (process.env.NODE_ENV !== 'production') console.log('Auto-reply sent:', r2)
            })
            .catch((err2) => {
              // Auto-reply failure should not block the main success path
              console.error('Auto-reply error:', err2)
            })
        }

        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setErrors({ name: '', email: '' })
        setSubmitAttempted(false)
        setTimeout(() => setStatus('idle'), 2800)
      })
      .catch((err) => {
        console.error('EmailJS error:', err)
        setBackendError('Something went wrong. Please try again.')
        setStatus('error')
        setIsErrorDismissing(false)
        // Start fade-out after 2.5 seconds
        setTimeout(() => setIsErrorDismissing(true), 2500)
        // Auto-dismiss error after 3 seconds
        setTimeout(() => {
          setStatus('idle')
          setBackendError('')
          setIsErrorDismissing(false)
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
          <div className="contact__card glass-panel glass-anim">
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

          <form className="contact__form glass-panel glass-anim" onSubmit={handleSubmit} noValidate>
            <div className="contact__formRow contact__formRow--stacked">
              <div className="contact__field">
                <label htmlFor="name">Name</label>
                <input
                  key={`name-${shakeKey}`}
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
                  key={`email-${shakeKey}`}
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
                <span className={`contact__statusMessage contact__statusMessage--error ${isErrorDismissing ? 'is-dismissing' : ''}`}>
                  {backendError ? backendError : 'Please fill in all required fields.'}
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
