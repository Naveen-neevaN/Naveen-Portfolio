'use client'

import { useState, useEffect, useRef } from 'react'
import emailjs from 'emailjs-com'
import { personalInfo } from '@/data/personalInfo.js'
import { useScrollAnimation } from '@/hooks/useScrollAnimation.js'
import './Contact.css'

const emailConfig = {
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '',
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
  adminTemplateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN ?? '',
  autoTemplateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_AUTO ?? '',
}

const initialFormData = { name: '', email: '', message: '' }
const initialErrors = { name: '', email: '', message: '' }

const validateField = (name, value) => {
  const normalizedValue = value?.trim() ?? ''

  if (name === 'name' && !normalizedValue) return 'Name is required.'
  if (name === 'email') {
    if (!normalizedValue) return 'Email is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedValue)) return 'Please enter a valid email address.'
  }
  if (name === 'message' && !normalizedValue) return 'Message is required.'

  return ''
}

const validateForm = (data) => ({
  name: validateField('name', data.name),
  email: validateField('email', data.email),
  message: validateField('message', data.message),
})

const hasValidationErrors = (nextErrors) => Object.values(nextErrors).some(Boolean)

const Contact = () => {
  const [ref, isVisible] = useScrollAnimation(0.2)
  const [formData, setFormData] = useState(initialFormData)
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState(initialErrors)
  const [backendError, setBackendError] = useState('')
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [isErrorDismissing, setIsErrorDismissing] = useState(false)
  const [shakeKey, setShakeKey] = useState(0)
  const timeoutIds = useRef([])

  useEffect(() => {
    if (emailConfig.publicKey) emailjs.init(emailConfig.publicKey)
  }, [])

  useEffect(() => {
    return () => {
      timeoutIds.current.forEach((timeoutId) => clearTimeout(timeoutId))
    }
  }, [])

  const setManagedTimeout = (callback, delay) => {
    const timeoutId = window.setTimeout(callback, delay)
    timeoutIds.current.push(timeoutId)
    return timeoutId
  }

  const clearManagedTimeouts = () => {
    timeoutIds.current.forEach((timeoutId) => clearTimeout(timeoutId))
    timeoutIds.current = []
  }

  const showTemporaryError = () => {
    clearManagedTimeouts()
    setStatus('error')
    setShakeKey((prev) => prev + 1)
    setIsErrorDismissing(false)
    setManagedTimeout(() => setIsErrorDismissing(true), 2500)
    setManagedTimeout(() => {
      setStatus('idle')
      setIsErrorDismissing(false)
    }, 3000)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitAttempted(true)
    setBackendError('')

    const newErrors = validateForm(formData)
    setErrors(newErrors)
    if (hasValidationErrors(newErrors)) {
      showTemporaryError()
      return
    }

    if (!emailConfig.publicKey || !emailConfig.serviceId || !emailConfig.adminTemplateId) {
      setBackendError('Email service is not configured yet.')
      showTemporaryError()
      return
    }

    clearManagedTimeouts()
    setStatus('sending')

    const adminParams = {
      to_email: personalInfo.email,
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      reply_to: formData.email,
    }

    try {
      const response = await emailjs.send(emailConfig.serviceId, emailConfig.adminTemplateId, adminParams)
      if (process.env.NODE_ENV !== 'production') console.log('Admin email sent:', response)

      if (emailConfig.autoTemplateId) {
        const autoParams = {
          to_email: formData.email,
          email: formData.email,
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          reply_to: personalInfo.email,
        }

        emailjs.send(emailConfig.serviceId, emailConfig.autoTemplateId, autoParams)
          .catch((error) => {
            console.error('Auto-reply error:', error)
          })
      }

      setStatus('success')
      setFormData(initialFormData)
      setErrors(initialErrors)
      setSubmitAttempted(false)
      setManagedTimeout(() => setStatus('idle'), 2800)
    } catch (error) {
      console.error('EmailJS error:', error)
      setBackendError('Something went wrong. Please try again.')
      showTemporaryError()
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    if (submitAttempted) {
      setErrors((previous) => ({ ...previous, [name]: validateField(name, value) }))
    }
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
                  aria-invalid={Boolean(submitAttempted && errors.name)}
                  aria-describedby="name-error"
                  className={`${submitAttempted && errors.name ? 'has-error' : ''}`}
                />
                <div id="name-error" className={`contact__fieldError ${errors.name ? 'is-visible' : ''}`}>
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
                  aria-invalid={Boolean(submitAttempted && errors.email)}
                  aria-describedby="email-error"
                  className={`${submitAttempted && errors.email ? 'has-error' : ''}`}
                />
                <div id="email-error" className={`contact__fieldError ${errors.email ? 'is-visible' : ''}`}>
                  {errors.email}
                </div>
              </div>
            </div>

            <div className="contact__field">
              <label htmlFor="message">Message</label>
              <textarea
                key={`message-${shakeKey}`}
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                placeholder="Share what's on your mind—ideas, opportunities, collaboration..."
                required
                aria-invalid={Boolean(submitAttempted && errors.message)}
                aria-describedby="message-error"
                className={`${submitAttempted && errors.message ? 'has-error' : ''}`}
              />
              <div id="message-error" className={`contact__fieldError ${errors.message ? 'is-visible' : ''}`}>
                {errors.message}
              </div>
            </div>

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
