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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 3000)
    }, 1000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="contact section-padding">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">I'd love to hear from you</p>
        
        <div 
          ref={ref}
          className={`contact-content ${isVisible ? 'fade-in-up' : ''}`}
        >
          <div className="contact-info">
            <h3>Contact Information</h3>
            <div className="contact-details">
              <div className="contact-item">
                <strong>Email:</strong>
                <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
              </div>
              {personalInfo.phone && (
                <div className="contact-item">
                  <strong>Phone:</strong>
                  <a href={`tel:${personalInfo.phone}`}>{personalInfo.phone}</a>
                </div>
              )}
              <div className="contact-item">
                <strong>Location:</strong>
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Send Message'}
            </button>
            {status === 'success' && (
              <p className="form-success">Thank you! I'll get back to you soon.</p>
            )}
            {status === 'error' && (
              <p className="form-error">Something went wrong. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
