import './globals.css'
import { Poppins, Manrope } from 'next/font/google'

export const metadata = {
  title: 'NAVEEN K - Tosca Automation Test Lead',
  description:
    'Senior Project Engineer and Tosca Automation Test Lead with 5 years of experience in BFSI applications, AI-based testing, and automation strategy',
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
      <body>{children}</body>
    </html>
  )
}
