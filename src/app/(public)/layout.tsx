import './globals.css'
import type { Metadata } from 'next'
import { Nav } from '@/components/Navbar.tsx'

export const metadata: Metadata = {
  title: 'Chayon',
  description: 'Belajar bareng. Ringan, rapi, to the point.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen antialiased">
        <Nav />
        <main className="mx-auto max-w-6xl px-4 md:px-6">{children}</main>
        <footer className="border-t border-white/10 mt-12 py-8 text-sm text-white/60 text-center">
          © {new Date().getFullYear()} Chayon
        </footer>
      </body>
    </html>
  )
}
