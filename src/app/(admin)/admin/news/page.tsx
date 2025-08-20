'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AdminGuard } from '@/components/AdminGuard'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

type News = { id: string; title: string; created_at: string }

export default function AdminNews() {
  const supabase = createClient()
  const [items, setItems] = useState<News[]>([])
  const [q, setQ] = useState('')

  const load = async () => {
    let query = supabase.from('news').select('id,title,created_at').order('created_at', { ascending: false })
    if (q.trim()) query = query.ilike('title', `%${q}%`)
    const { data } = await query
    setItems(data || [])
  }

  // first load
  useEffect(() => { load() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AdminGuard>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Berita</h1>
            <p className="text-white/60 text-sm">Kelola konten berita</p>
          </div>
          <Link href="/admin/news/new"><Button>+ Tambah</Button></Link>
        </div>

        <Card>
          <div className="flex gap-2 items-center">
            <input
              className="h-10 w-full rounded-2xl bg-white/90 text-black px-3"
              placeholder="Cari judul…"
              value={q}
              onChange={e => setQ(e.target.value)}
            />
            <Button onClick={load}>Cari</Button>
          </div>
        </Card>

        <Card>
          <ul className="divide-y divide-white/10">
            {items.map(x => (
              <li key={x.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium">{x.title}</p>
                  <p className="text-xs text-white/60">{new Date(x.created_at).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/news/${x.id}/edit`} className="text-sm underline">Edit</Link>
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
