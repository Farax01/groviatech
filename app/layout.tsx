import type { Metadata, Viewport } from 'next'
import { Hanken_Grotesk } from 'next/font/google'
import './globals.css'

// Hanken Grotesk is the free stand-in the design reference recommends for Saans.
// It is a variable font, so the 300 / 450 / 650 weights below are real, not rounded.
const sans = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })

export const viewport: Viewport = { themeColor: '#ffffff' }

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://groviatech.vercel.app'),
  title: { default: 'Groviatech', template: '%s | Groviatech' },
  description: 'Secure websites and security testing for small businesses and AI startups.',
  openGraph: { siteName: 'Groviatech', type: 'website', locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('gt-intro'))document.documentElement.setAttribute('data-intro','seen')}catch(e){console.warn('Could not read the homepage intro state.',e)}",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
