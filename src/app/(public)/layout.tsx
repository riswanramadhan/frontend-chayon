import '../globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chayon',
  description: 'Belajar bareng. Ringan, rapi, to the point.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="i d">
      <body className="min-h-screen bg-[#0b0b0b] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
