'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AdminGuard } from '@/components/AdminGuard'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

type Course = {
  id: string
  title: string
  course_slug: string | null
  course_category: string | null
  gform_url: string | null
  created_at: string | null
}

export default function AdminCourses() {
  const supabase = createClient()
  const [items, setItems] = useState<Course[]>([])

  const load = async () => {
    const { data } = await supabase
      .from('courses')
      .select('id,title,course_slug,course_category,gform_url,created_at')
      .order('created_at', { ascending: false })
    setItems(data || [])
  }

  useEffect(() => { load() }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="min-w-full text-sm">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="text-left p-3">Judul</th>
                  <th className="text-left p-3">Kategori</th>
                  <th className="text-left p-3">Slug</th>
                  <th className="text-left p-3">GForm</th>
                  <th className="text-left p-3 w-40">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {items.map((r) => (
                  <tr key={r.id} className="border-b border-white/10">
                    <td className="p-3">{r.title}</td>
                    <td className="p-3">{r.course_category || '-'}</td>
                    <td className="p-3">{r.course_slug || '-'}</td>
                    <td className="p-3 truncate max-w-[160px]">{r.gform_url}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/courses/${r.id}/edit`}
                          className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => del(r.id)}
                          className="px-3 py-1 rounded-lg bg-red-500/80 hover:bg-red-500 text-white"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td className="p-4 text-white/70" colSpan={5}>
                      Belum ada data.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminGuard>
  )
}
