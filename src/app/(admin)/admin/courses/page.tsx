'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AdminGuard } from '@/components/AdminGuard'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

type Course = { id: string; title: string; gform_url: string; created_at: string }

export default function AdminCourses() {
  const supabase = createClient()
  const [items, setItems] = useState<Course[]>([])

  const load = async () => {
    const { data } = await supabase.from('courses').select('id,title,gform_url,created_at').order('created_at', { ascending: false })
    setItems(data || [])
  }

  useEffect(() => { load() }, [])

  const del = async (id: string) => {
    if (!confirm('Hapus kursus ini?')) return
    await supabase.from('courses').delete().eq('id', id)
    await load()
  }

  return (
    <AdminGuard>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Kursus</h1>
            <p className="text-white/60 text-sm">Kelola kursus dan link Google Form</p>
          </div>
          <Link href="/admin/courses/new"><Button>+ Tambah</Button></Link>
        </div>

        <Card>
          <ul className="divide-y divide-white/10">
            {items.map(x => (
              <li key={x.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium">{x.title}</p>
                  <p className="text-xs text-white/60 line-clamp-1">{x.gform_url}</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/courses/${x.id}/edit`} className="text-sm underline">Edit</Link>
                  <button onClick={() => del(x.id)} className="text-sm text-red-400 underline">Hapus</button>
                </div>
              </li>
            ))}
            {items.length === 0 && <li className="py-6 text-white/60 text-sm">Belum ada data.</li>}
          </ul>
        </Card>
      </div>
    </AdminGuard>
  )
}
