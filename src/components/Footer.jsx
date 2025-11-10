import { personalInfo } from '@/data/personalInfo.js'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaInstagram } from 'react-icons/fa'
import './Footer.css'

const iconMap = {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaInstagram,
}

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-social" role="navigation" aria-label="Social media links">
            {personalInfo.socialLinks.map((social, index) => {
              const IconComponent = iconMap[social.icon] || FaEnvelope
              return (
                <a
                  key={social.name ?? index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={`Connect on ${social.name}`}
                  title={social.name}
                >
                  <IconComponent aria-hidden="true" />
                </a>
              )
            })}
          </div>
          <p className="footer-text" role="contentinfo">
            Let&apos;s connect and create something amazing together
          </p>
          <p className="copyright-text">© {currentYear} Naveen K. All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
