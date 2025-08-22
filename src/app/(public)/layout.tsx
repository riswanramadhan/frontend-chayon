import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chayon',
  description: 'Belajar bareng. Ringan, rapi, to the point.',
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
