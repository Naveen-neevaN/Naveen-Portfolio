import './globals.css'
import { ThemeSwitch } from '../components/ThemeSwitch'

export const metadata = {
  title: 'NAVEEN K - Tosca Automation Test Lead',
  description: 'Senior Project Engineer and Tosca Automation Test Lead with 5 years of experience in BFSI applications, AI-based testing, and automation strategy',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeSwitch />
        {children}
      </body>
    </html>
  )
}
