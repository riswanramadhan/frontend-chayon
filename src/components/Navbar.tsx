"use client"

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Berita' },
  { href: '/kursus', label: 'Kursus' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="flex items-center text-xl font-bold text-gray-800"
        >
          <Image
            src="/logo.svg"
            width={167}
            height={43}
            alt="Chayon Online Course Logo"
          />
        </Link>
        <nav className="flex space-x-4">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 ${
                  active
                    ? 'font-bold text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

