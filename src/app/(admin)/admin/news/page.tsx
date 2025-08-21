'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { AdminGuard } from '@/components/AdminGuard'

type News = {
  id: string
  title: string
  slug: string | null
  category: string | null
  created_at: string | null
}

export default function AdminNewsListPage() {
  const supabase = createClient()
  const [rows, setRows] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    setErr(null)
    const { data, error } = await supabase
      .from('news')
      .select('id,title,slug,category,created_at')
      .order('created_at', { ascending: false })
    if (error) setErr(error.message)
    setRows(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function onDelete(id: string) {
    if (!confirm('Hapus berita ini?')) return
    const { error } = await supabase.from('news').delete().eq('id', id)
    if (error) {
      alert('Gagal hapus: ' + error.message)
      return
    }
    setRows((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <AdminGuard>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Berita</h1>
          <Link
            href="/admin/news/new"
            className="px-4 py-2 rounded-xl bg-white text-black text-sm font-medium"
          >
            + Tambah Berita
          </Link>
        </div>

        {loading && <div>Memuat…</div>}
        {err && <div className="text-red-500">{err}</div>}

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="text-left p-3">Judul</th>
                <th className="text-left p-3">Kategori</th>
                <th className="text-left p-3">Slug</th>
                <th className="text-left p-3">Tanggal</th>
                <th className="text-left p-3 w-40">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-white/10">
                  <td className="p-3">{r.title}</td>
                  <td className="p-3">{r.category || '-'}</td>
                  <td className="p-3">{r.slug || '-'}</td>
                  <td className="p-3">{r.created_at?.slice(0, 10)}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/news/${r.id}/edit`}
                        className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => onDelete(r.id)}
                        className="px-3 py-1 rounded-lg bg-red-500/80 hover:bg-red-500 text-white"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && !loading && (
                <tr>
                  <td className="p-4 text-white/70" colSpan={5}>
                    Belum ada data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminGuard>
  )
}
