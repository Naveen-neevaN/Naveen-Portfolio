import './globals.css'
import { Poppins, Manrope } from 'next/font/google'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export const metadata = {
  title: 'Naveen K - Tosca Test Lead',
  description:
    'Senior Project Engineer and Tosca Automation Test Lead with 5 years of experience in BFSI applications, AI-based testing, and automation strategy',
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
    apple: `${basePath}/favicon.svg`,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
}

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-manrope',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body>
        {/* Skip link for keyboard users */}
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  )
}
