import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackButton from '@/components/BackButton'

export const metadata: Metadata = {
  title: 'Chayon',
  description: 'Belajar bareng. Ringan, rapi, to the point.',
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen relative">
        <BackButton className="absolute top-4 left-4" />
        {children}
      </main>
      <Footer />
    </>
  )
}
