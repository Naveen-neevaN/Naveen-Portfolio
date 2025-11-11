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
    // Category 1: Automation / Testing Tools
    const automationTools = new Set([
      'Tosca',
      'Selenium (Java)',
      'Selenium (Python)',
      'Playwright',
      'Katalon',
      'Jenkins',
      'Jira',
      'Git',
      'Bitbucket',
      'Postman',
    ])

    // Category 2: Frontend + Backend Skills / Dev Tools
    const fullstackDevTools = new Set([
      'MySQL',
      'JavaScript',
      'TypeScript (basic)',
      'VS Code',
      'Cursor AI Studio',
    ])

    // Category 3: Other Technical / Cloud / AI Skills
    const cloudAiTechnical = new Set([
      'AWS',
      'Google Vertex AI',
      'Agile',
      'DevOps',
      'Test Strategy',
      'Test Framework Design & Management',
    ])

    // Category 4: Professional / Project Management
    const professionalManagement = new Set([
      'Team Management',
      'Project Management',
      'Client Interaction & Handling',
      'Client Communication',
      'Leadership & Mentoring',
      'Process Optimization',
      'Documentation & Reporting',
      'Strategic Planning',
      'Quality Assurance Governance',
      'Decision Making',
    ])

    const buckets = {
      automation: [],
      fullstack: [],
      cloudai: [],
      professional: [],
    }

    for (const s of personalInfo.skills) {
      const name = s.name
      if (automationTools.has(name)) {
        buckets.automation.push(s)
      } else if (fullstackDevTools.has(name)) {
        buckets.fullstack.push(s)
      } else if (cloudAiTechnical.has(name)) {
        buckets.cloudai.push(s)
      } else if (professionalManagement.has(name)) {
        buckets.professional.push(s)
      } else {
        // fallback: infer based on category
        if (s.category === 'backend' || s.category === 'frontend') {
          buckets.fullstack.push(s)
        } else if (s.category === 'tools') {
          buckets.automation.push(s)
        } else {
          buckets.cloudai.push(s)
        }
      }
    }

    const ordered = [
      ['Automation / Testing Tools', buckets.automation, '🛠️'],
      ['Frontend + Backend Skills', buckets.fullstack, '🎨'],
      ['Cloud & AI Skills', buckets.cloudai, '☁️'],
      ['Leadership Skills', buckets.professional, '🧭'],
    ]

    return ordered
  }, [])

  return (
    <section id="skills" className="skills section-padding">
      <div className="container">
        <h2 className="section-heading">Technologies and Tools</h2>
        <p className="section-subheading">
          Modern automation ecosystems, AI accelerators, and quality engineering toolchains I partner with daily.
        </p>

        <div ref={ref} className={`skills__grid ${isVisible ? 'is-visible' : ''}`}>
          {skillGroups.map(([groupTitle, skills, icon], index) => (
            <article
              key={groupTitle}
              className="skills__group glass-panel"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <header className="skills__groupHeader">
                <span className="skills__groupIcon">{icon}</span>
                <h4 className="skills__groupTitle gradient-text">{groupTitle}</h4>
              </header>

              <div className="skills__chips">
                {skills.map((skill, skillIndex) => (
                  <span
                    key={`${groupTitle}-${skill.name}`}
                    className="skills__chip"
                    style={{ transitionDelay: `${index * 100 + skillIndex * 40}ms` }}
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
