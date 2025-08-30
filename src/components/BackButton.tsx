'use client'
import { ArrowLeft } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import clsx from 'clsx'

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  if (pathname === '/') return null
  return (
    <button
      onClick={() => router.back()}
      className={clsx('text-gray-600 hover:text-gray-900', className)}
      aria-label="Kembali"
    >
      <ArrowLeft className="w-5 h-5" />
    </button>
  )
}