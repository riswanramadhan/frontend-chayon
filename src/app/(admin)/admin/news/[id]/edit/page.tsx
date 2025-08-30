'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/slug'
import { AdminGuard } from '@/components/AdminGuard'
import CategorySelect from '@/components/CategorySelect'
import { NEWS_CATEGORIES } from '@/lib/constants'
import UploadImage from '@/components/UploadImage'
import RichTextEditor from '@/components/RichTextEditor'

type Row = {
  id: string
  title: string | null
  slug: string | null
  category: string | null
  description: string | null
  content: string | null
  image_url: string | null
}

export default function EditNewsPage() {
  const supabase = createClient()
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [row, setRow] = useState<Row | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setErr(null)
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', params.id)
        .single()
      if (error) setErr(error.message)
      setRow(data as Row)
      setLoading(false)
    }
    load()
  }, [params.id, supabase])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!row) return
    setSaving(true)
    setErr(null)
    const { error } = await supabase
      .from('news')
      .update({
        title: row.title,
        slug: row.slug ? slugify(row.slug) : slugify(row.title || ''),
        category: row.category,
        description: row.description,
        content: row.content,
        image_url: row.image_url || null,
      })
      .eq('id', row.id)
    setSaving(false)
    if (error) { setErr(error.message); return }
    router.push('/admin/news')
  }

  if (loading) return <AdminGuard><div>Memuat…</div></AdminGuard>
  if (!row) return <AdminGuard><div>Data tidak ditemukan.</div></AdminGuard>

  return (
    <AdminGuard>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold mb-4">Edit Berita</h1>
        {err && <div className="text-red-500 mb-3">{err}</div>}
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            className="w-full rounded-xl border border-white/20 bg-transparent p-3"
            placeholder="Judul"
            value={row.title ?? ''}
            onChange={(e) => setRow({ ...row, title: e.target.value })}
            required
          />
          <input
            className="w-full rounded-xl border border-white/20 bg-transparent p-3"
            placeholder="Slug (opsional, otomatis dari judul)"
            value={row.slug ?? ''}
            onChange={(e) => setRow({ ...row, slug: e.target.value })}
          />
          <CategorySelect
            value={row.category ?? ''}
            onChange={(v) => setRow({ ...row, category: v })}
            options={NEWS_CATEGORIES}
            label="Kategori"
          />
          <UploadImage
            folder="news"
            value={row.image_url ?? ''}
            onChange={(url) => setRow({ ...row, image_url: url })}
          />
          <textarea
            className="w-full rounded-xl border border-white/20 bg-transparent p-3 min-h-[90px]"
            placeholder="Deskripsi"
            value={row.description ?? ''}
            onChange={(e) => setRow({ ...row, description: e.target.value })}
          />
           <RichTextEditor
            value={row.content ?? ''}
            onChange={(v) => setRow({ ...row, content: v })}
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-white text-black text-sm font-medium disabled:opacity-50"
            >
              {saving ? 'Menyimpan…' : 'Simpan'}
            </button>
            <button
              type="button"
              onClick={() => history.back()}
              className="px-4 py-2 rounded-xl border border-white/20 text-sm"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </AdminGuard>
  )
}
