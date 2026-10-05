import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter, JetBrains_Mono, Noto_Sans_Devanagari, Noto_Serif_Devanagari } from 'next/font/google'
import { CustomCursor } from '@/components/custom-cursor'
import { IntroLoader } from '@/components/intro-loader'
import { AppProviders } from '@/components/providers/app-providers'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { SkipLink } from '@/components/skip-link'
import { siteUrl } from '@/lib/site'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap', axes: ['opsz'] })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' })
const devaSans = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600'],
  variable: '--font-deva-sans',
  display: 'swap',
  preload: false,
})
const devaSerif = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '600'],
  variable: '--font-deva-serif',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Flora Explorer — A botanical field guide',
    template: '%s · Flora Explorer',
  },
  description:
    'Explore useful plants in English, Hindi and Spanish: where they grow, their climate, compounds, seasons, history and uses.',
  generator: 'v0.app',
  keywords: ['plants', 'botany', 'herbs', 'spices', 'turmeric', 'tulsi', 'neem', 'field guide'],
  openGraph: {
    type: 'website',
    siteName: 'Flora Explorer',
    title: 'Flora Explorer — A botanical field guide',
    description: 'Every leaf holds a story. Explore useful plants in three languages.',
    images: [{ url: '/images/turmeric.png', width: 1200, height: 800, alt: 'Fresh turmeric rhizomes' }],
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f5f2' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable} ${devaSans.variable} ${devaSerif.variable}`}
    >
      <body id="top" className="grain antialiased">
        <AppProviders>
          <SkipLink />
          <IntroLoader />
          <SiteHeader />
          <div id="main">{children}</div>
          <SiteFooter />
          <CustomCursor />
        </AppProviders>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
