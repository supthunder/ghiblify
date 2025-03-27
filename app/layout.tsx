import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ghiblify - 4o Image Generation',
  description: 'Transform your images with Studio Ghibli style AI generation',
  generator: 'v0.dev',
  metadataBase: new URL('https://ghiblify.vercel.app'),
  manifest: '/manifest.json',
  themeColor: '#09090b',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' }
    ],
    apple: { url: '/apple-touch-icon.svg', type: 'image/svg+xml' },
  },
  openGraph: {
    title: 'Ghiblify - 4o Image Generation',
    description: 'Transform your images with Studio Ghibli style AI generation',
    url: 'https://ghiblify.vercel.app',
    siteName: 'Ghiblify',
    images: [
      {
        url: 'https://ghiblify.vercel.app/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Ghiblify - Transform your images with Studio Ghibli style AI',
      },
      {
        url: 'https://ghiblify.vercel.app/og-image.jpg',  // Fallback for platforms that don't support SVG
        width: 1200,
        height: 630,
        alt: 'Ghiblify - Transform your images with Studio Ghibli style AI',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ghiblify - 4o Image Generation',
    description: 'Transform your images with Studio Ghibli style AI generation',
    images: ['https://ghiblify.vercel.app/og-image.jpg'], // Twitter prefers JPG/PNG
    creator: '@ghiblify',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
