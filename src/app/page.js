import dynamic from 'next/dynamic'
import Header from '@/components/Header.jsx'
import Hero from '@/components/Hero.jsx'
import SkeletonSection from '@/components/SkeletonSection.jsx'

// Defer below-fold sections for faster initial page load; show light skeleton placeholder
const About = dynamic(() => import('@/components/About.jsx'), { ssr: true, loading: () => <SkeletonSection /> })
const Skills = dynamic(() => import('@/components/Skills.jsx'), { ssr: true, loading: () => <SkeletonSection /> })
const Projects = dynamic(() => import('@/components/Projects.jsx'), { ssr: true, loading: () => <SkeletonSection /> })
const Contact = dynamic(() => import('@/components/Contact.jsx'), { ssr: true, loading: () => <SkeletonSection /> })
const Footer = dynamic(() => import('@/components/Footer.jsx'), { ssr: true, loading: () => <SkeletonSection /> })

export default function Home() {
  return (
    <main id="main">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
