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

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 2800)
    }, 1000)
  }

  const handleChange = (event) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }))
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
              <div className="contact__detail">
                <span className="contact__detail-icon" aria-hidden="true">
                  ✉️
                </span>
                <span className="contact__detail-label">Email</span>
                <a href={`mailto:${personalInfo.email}`} className="contact__detail-value">
                  {personalInfo.email}
                </a>
              </div>

              {personalInfo.phone ? (
                <div className="contact__detail">
                  <span className="contact__detail-icon" aria-hidden="true">
                    📞
                  </span>
                  <span className="contact__detail-label">Phone</span>
                  <a href={`tel:${personalInfo.phone}`} className="contact__detail-value">
                    {personalInfo.phone}
                  </a>
                </div>
              ) : null}

              <div className="contact__detail">
                <span className="contact__detail-icon" aria-hidden="true">
                  📍
                </span>
                <span className="contact__detail-label">Location</span>
                <span className="contact__detail-value">{personalInfo.location}</span>
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
                  placeholder="Enter your name"
                />
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
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="contact__field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                placeholder="Tell me a little about your project or idea..."
                required
              />
            </div>

            <button type="submit" className="btn btn-primary contact__submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent' : 'Send Message'}
            </button>

            <div className="contact__status" role="status" aria-live="polite">
              {status === 'success' ? (
                <span className="contact__statusMessage contact__statusMessage--success">
                  Thank you! I’ll be in touch shortly.
                </span>
              ) : status === 'error' ? (
                <span className="contact__statusMessage contact__statusMessage--error">
                  Something went wrong. Please try again.
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
