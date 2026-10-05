import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { Providers } from './providers'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MAX Chat — GREEN-API',
  description: 'Чат MAX через GREEN-API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
