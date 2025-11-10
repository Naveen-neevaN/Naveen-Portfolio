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
    const automationToolsSet = new Set([
      'Tosca',
      'Selenium (Java)',
      'Selenium (Python)',
      'Playwright',
      'Katalon',
      'Postman',
      'Jenkins',
      'Jira',
      'Git',
      'Bitbucket',
      'SailPoint',
    ])
    const frontendBackendSet = new Set([
      'JavaScript',
      'TypeScript (basic)',
      'MySQL',
      'Python',
    ])
    const otherSet = new Set([
      'AWS',
      'Azure (basic)',
      'Google Vertex AI',
      'Agile',
      'Test Strategy',
      'Test Framework Design',
      'Wipro GenAI Accelerator',
      'MCP Servers',
      'Salesforce',
    ])

    const buckets = {
      automation: [],
      fullstack: [],
      other: [],
    }

    for (const s of personalInfo.skills) {
      const name = s.name
      if (automationToolsSet.has(name)) {
        buckets.automation.push(s)
      } else if (frontendBackendSet.has(name)) {
        buckets.fullstack.push(s)
      } else if (otherSet.has(name)) {
        buckets.other.push(s)
      } else {
        // fallback: infer based on category
        if (s.category === 'backend' || s.category === 'frontend') {
          buckets.fullstack.push(s)
        } else if (s.category === 'tools') {
          buckets.automation.push(s)
        } else {
          buckets.other.push(s)
        }
      }
    }

    const ordered = [
      ['Automation / Testing Tools', buckets.automation],
      ['Frontend + Backend Skills', buckets.fullstack],
      ['Other Technical / Cloud / AI', buckets.other],
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
          {skillGroups.map(([groupTitle, skills], index) => (
            <article
              key={groupTitle}
              className="skills__group glass-panel"
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <header className="skills__groupHeader">
                <span className="skills__groupBadge">{groupTitle}</span>
                <h3 className="skills__groupTitle gradient-text">{groupTitle}</h3>
              </header>

              <div className="skills__chips">
                {skills.map((skill, skillIndex) => (
                  <span
                    key={`${groupTitle}-${skill.name}`}
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
