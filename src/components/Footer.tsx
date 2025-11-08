import { personalInfo } from '@/data/personalInfo'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'
import './Footer.css'

// Icon mapping
const iconMap: { [key: string]: React.ComponentType } = {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
}

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-social">
            {personalInfo.socialLinks.map((social, index) => {
              const IconComponent = iconMap[social.icon] || FaEnvelope
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.name}
                >
                  <IconComponent />
                </a>
              )
            })}
          </div>
          <p className="footer-text">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

