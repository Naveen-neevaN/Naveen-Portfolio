'use client'

import { personalInfo } from '@/data/personalInfo.js'
import { useScrollAnimation } from '@/hooks/useScrollAnimation.js'
import './Projects.css'

const Projects = () => {
  const [ref, isVisible] = useScrollAnimation(0.2)

  return (
    <section id="projects" className="projects section-padding">
      <div className="container">
        <h2 className="section-heading">Some of My Recent Work</h2>
        <p className="section-subheading">
          Impactful automation programs and enterprise accelerators delivered in high-stakes environments.
        </p>

        <div ref={ref} className={`projects__grid ${isVisible ? 'is-visible' : ''}`}>
          {personalInfo.projects.map((project, index) => (
            <article
              key={project.title}
              className="projects__card glass-panel"
              style={{ transitionDelay: `${index * 110}ms` }}
            >
              <div className="projects__cardBody">
                <span className="projects__eyebrow">Featured Project</span>
                <h3 className="projects__title gradient-text">{project.title}</h3>
                <p className="projects__description text-muted">{project.description}</p>
              </div>

              <div className="projects__footer">
                <div className="projects__tech">
                  {project.technologies?.map((tech) => (
                    <span key={`${project.title}-${tech}`} className="projects__techChip">
                      {tech}
                    </span>
                  ))}
                </div>

                {(project.githubUrl || project.liveUrl) && (
                  <div className="projects__links">
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects__link"
                      >
                        GitHub
                      </a>
                    ) : null}
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects__link"
                      >
                        Live Demo
                      </a>
                    ) : null}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
