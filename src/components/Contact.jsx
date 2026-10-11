'use client'

import { useState, useEffect } from 'react'
import emailjs from 'emailjs-com'
import { personalInfo } from '@/data/personalInfo.js'
import { useScrollAnimation } from '@/hooks/useScrollAnimation.js'
import './Contact.css'

const emailConfig = {
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '',
  // GitHub Actions substitutes an unset secret with an empty string. Use `||`
  // for these known IDs so that an empty optional deployment variable does not
  // override their working defaults.
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_7jktasp',
  adminTemplateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN || 'template_grhlujf',
  autoTemplateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_AUTO || 'template_psfmd3n',
}

const isContactServiceConfigured = () => (
  Boolean(emailConfig.publicKey.trim())
  && Boolean(emailConfig.serviceId.trim())
  && Boolean(emailConfig.adminTemplateId.trim())
)

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

const getEmailJsError = (error) => ({
  status: Number(error?.status) || 0,
  message: typeof error?.text === 'string' && error.text.trim()
    ? error.text.trim()
    : typeof error?.message === 'string' && error.message.trim()
      ? error.message.trim()
      : 'The email service did not return an error message.',
})

const getUserFacingEmailError = ({ status, message }) => {
  const normalizedMessage = message.toLowerCase()

  if (status === 422 && normalizedMessage.includes('recipient')) {
    return 'The contact inbox is temporarily unavailable. Please use the email link instead.'
  }
  if (status === 429) return 'The contact service is busy. Please wait a moment and try again.'
  if (status === 401 || status === 403) return 'The contact service could not be authorised. Please use the email link instead.'
  if (status >= 500) return 'The contact service is temporarily unavailable. Please try again shortly.'

  return 'Your message could not be sent. Please try again or use the email link instead.'
}

const Contact = () => {
  const [ref, isVisible] = useScrollAnimation(0.2)
  const [formData, setFormData] = useState(initialFormData)
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState(initialErrors)
  const [backendError, setBackendError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [submitAttempted, setSubmitAttempted] = useState(false)

  useEffect(() => {
    if (emailConfig.publicKey) emailjs.init(emailConfig.publicKey)
  }, [])

  const showError = (message) => {
    setBackendError(message)
    setSuccessMessage('')
    setStatus('error')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitAttempted(true)
    setBackendError('')
    setSuccessMessage('')

    const newErrors = validateForm(formData)
    setErrors(newErrors)
    if (hasValidationErrors(newErrors)) {
      showError('Please correct the highlighted fields and try again.')
      return
    }

    if (!isContactServiceConfigured()) {
      showError('The contact service is not configured. Please use the email link instead.')
      return
    }

    setStatus('sending')
    setSuccessMessage('Sending your message…')

    const submission = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    }

    const adminParams = {
      to_email: personalInfo.email,
      // EmailJS templates in older projects often use `email` or
      // `recipient_email` in their To Email field. Keep each recipient alias
      // populated so existing templates continue to resolve the owner address.
      email: personalInfo.email,
      recipient_email: personalInfo.email,
      from_name: submission.name,
      from_email: submission.email,
      message: submission.message,
      reply_to: submission.email,
    }

    try {
      const response = await emailjs.send(emailConfig.serviceId, emailConfig.adminTemplateId, adminParams)
      if (process.env.NODE_ENV !== 'production') console.log('Admin email sent:', response)

      if (emailConfig.autoTemplateId.trim()) {
        const autoParams = {
          to_email: submission.email,
          email: submission.email,
          recipient_email: submission.email,
          from_name: submission.name,
          from_email: submission.email,
          message: submission.message,
          reply_to: personalInfo.email,
        }

        try {
          await emailjs.send(emailConfig.serviceId, emailConfig.autoTemplateId, autoParams)
        } catch (error) {
          const emailError = getEmailJsError(error)
          console.warn('EmailJS acknowledgement error:', emailError, error)
          setStatus('partial')
          setSuccessMessage("Your message was sent, but we couldn't send the acknowledgement email.")
          setFormData(initialFormData)
          setErrors(initialErrors)
          setSubmitAttempted(false)
          return
        }
      }

      setStatus('success')
      setSuccessMessage("Message sent. I'll be in touch shortly.")
      setFormData(initialFormData)
      setErrors(initialErrors)
      setSubmitAttempted(false)
    } catch (error) {
      const emailError = getEmailJsError(error)
      // Keep the detailed response available during development without letting
      // Next.js replace the page with its console-error overlay.
      console.warn('EmailJS error:', emailError, error)
      showError(getUserFacingEmailError(emailError))
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

    if (status !== 'sending') {
      setStatus('idle')
      setBackendError('')
      setSuccessMessage('')
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
              {status === 'sending' ? 'Sending…' : status === 'success' || status === 'partial' ? 'Message Sent' : 'Send Message'}
            </button>

            <div className="contact__status" role={status === 'error' ? 'alert' : 'status'} aria-live="polite">
              {status === 'sending' || status === 'success' ? (
                <span className="contact__statusMessage contact__statusMessage--success">
                  {successMessage}
                </span>
              ) : status === 'partial' ? (
                <span className="contact__statusMessage contact__statusMessage--warning">
                  {successMessage}
                </span>
              ) : status === 'error' ? (
                <span className="contact__statusMessage contact__statusMessage--error">
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
