import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chayon Online Course',
  description: 'Belajar bareng. Ringan, rapi, to the point.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
