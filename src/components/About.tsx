import { personalInfo } from '@/data/personalInfo'
import './About.css'

const About = () => {
  return (
    <section id="about" className="about section-padding">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">Get to know me better</p>
        <div className="about-content">
          <div className="about-text">
            <p>{personalInfo.about}</p>
            <div className="about-details">
              <div className="detail-item">
                <strong>Email:</strong> {personalInfo.email}
              </div>
              <div className="detail-item">
                <strong>Location:</strong> {personalInfo.location}
              </div>
              {personalInfo.phone && (
                <div className="detail-item">
                  <strong>Phone:</strong> {personalInfo.phone}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

