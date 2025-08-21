'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { AdminGuard } from '@/components/AdminGuard'

export default function AdminHome() {
  const supabase = createClient()
  const [newsCount, setNewsCount] = useState<number>(0)
  const [courseCount, setCourseCount] = useState<number>(0)

  useEffect(() => {
    const load = async () => {
      const { count: nCount } = await supabase.from('news').select('*', { count: 'exact', head: true })
      const { count: cCount } = await supabase.from('courses').select('*', { count: 'exact', head: true })
      setNewsCount(nCount ?? 0)
      setCourseCount(cCount ?? 0)
    }
    load()
  }, [supabase])

  return (
    <AdminGuard>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-white/60 text-sm mt-1">Ringkasan konten dan tindakan cepat</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-white/60">Total Berita</div>
                <div className="text-3xl font-semibold mt-1">{newsCount}</div>
              </div>
              <Link href="/admin/news" className="text-sm underline">Kelola</Link>
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-white/60">Total Kursus</div>
                <div className="text-3xl font-semibold mt-1">{courseCount}</div>
              </div>
              <Link href="/admin/courses" className="text-sm underline">Kelola</Link>
            </div>
          </Card>
        </div>

        <Card>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/news/new"><Button>+ Tambah Berita</Button></Link>
            <Link href="/admin/courses/new"><Button>+ Tambah Kursus</Button></Link>
          </div>
        </Card>
      </div>
    </AdminGuard>
  )
}
