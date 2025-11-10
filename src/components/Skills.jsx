'use client'

import { useMemo } from 'react'
import { personalInfo } from '@/data/personalInfo.js'
import { useScrollAnimation } from '@/hooks/useScrollAnimation.js'
import './Skills.css'

const friendlyCategoryNames = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Tooling & Platforms',
  other: 'Innovation & Focus Areas',
}

const Skills = () => {
  const [ref, isVisible] = useScrollAnimation(0.2)

  const skillGroups = useMemo(() => {
    const grouped = personalInfo.skills.reduce((acc, skill) => {
      const category = skill.category ?? 'other'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(skill)
      return acc
    }, /** @type {Record<string, typeof personalInfo.skills>} */ ({}))

    return Object.entries(grouped).filter(([, skills]) => skills.length > 0)
  }, [])

  return (
    <section id="skills" className="skills section-padding">
      <div className="container">
        <h2 className="section-heading">Technologies and Tools</h2>
        <p className="section-subheading">
          Modern automation ecosystems, AI accelerators, and quality engineering toolchains I partner with daily.
        </p>

        <div ref={ref} className={`skills__grid ${isVisible ? 'is-visible' : ''}`}>
          {skillGroups.map(([category, skills], index) => (
            <article
              key={category}
              className="skills__group glass-panel"
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <header className="skills__groupHeader">
                <span className="skills__groupBadge">{friendlyCategoryNames[category] ?? category}</span>
                <h3 className="skills__groupTitle gradient-text">
                  {friendlyCategoryNames[category] ?? category}
                </h3>
              </header>

              <div className="skills__chips">
                {skills.map((skill, skillIndex) => (
                  <span
                    key={`${category}-${skill.name}`}
                    className="skills__chip"
                    style={{ transitionDelay: `${index * 90 + skillIndex * 40}ms` }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
