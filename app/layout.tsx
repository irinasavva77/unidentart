import type { Metadata } from 'next'
import { Public_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const publicSans = Public_Sans({ 
  subsets: ["latin"],
  variable: '--font-public-sans'
});

export const metadata: Metadata = {
  title: 'UnidentArt - Clinica Stomatologica',
  description: 'Clinica stomatologica UnidentArt - Servicii de calitate pentru sanatatea ta dentara. Programeaza-te online acum!',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ro" className="bg-background">
      <body className={`${publicSans.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
