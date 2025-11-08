import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NAVEEN K - Tosca Automation Test Lead',
  description: 'Senior Project Engineer and Tosca Automation Test Lead with 5 years of experience in BFSI applications, AI-based testing, and automation strategy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

