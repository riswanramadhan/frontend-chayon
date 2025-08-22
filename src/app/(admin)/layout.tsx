import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const nav = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/news', label: 'Berita' },
    { href: '/admin/courses', label: 'Kursus' },
  ]
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 grid grid-cols-12 gap-6">
        <aside className="col-span-12 md:col-span-3 lg:col-span-3 space-y-3">
          <div className="rounded-3xl bg-white/5 border border-white/10 p-5">
            <div className="text-xl font-semibold">Chayon Admin</div>
            <p className="text-white/60 text-sm mt-1">Kelola konten dengan nyaman</p>
          </div>
          <nav className="rounded-3xl bg-white/5 border border-white/10 p-2">
            <ul className="space-y-1">
              {nav.map(n => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="block px-4 py-3 rounded-2xl hover:bg-white/10 transition text-sm"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="col-span-12 md:col-span-9 lg:col-span-9">{children}</main>
      </div>
    </div>
  )
}
