'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/slug'
import { AdminGuard } from '@/components/AdminGuard'
import CategorySelect from '@/components/CategorySelect'
import { NEWS_CATEGORIES } from '@/lib/constants'

export default function NewNewsPage() {
  const supabase = createClient()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setErr(null)
    const slug = slugify(title)
    const { error } = await supabase.from('news').insert({
      title,
      slug,
      category,
      description,
      content,
      image_url: imageUrl || null,
    })
    setSaving(false)
    if (error) { setErr(error.message); return }
    router.push('/admin/news')
  }

  return (
    <AdminGuard>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold mb-4">Tambah Berita</h1>
        {err && <div className="text-red-500 mb-3">{err}</div>}
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            className="w-full rounded-xl border border-white/20 bg-transparent p-3"
            placeholder="Judul"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <CategorySelect
            value={category}
            onChange={setCategory}
            options={NEWS_CATEGORIES}
            label="Kategori (opsional)"
          />
          <input
            className="w-full rounded-xl border border-white/20 bg-transparent p-3"
            placeholder="Image URL (opsional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <textarea
            className="w-full rounded-xl border border-white/20 bg-transparent p-3 min-h-[90px]"
            placeholder="Deskripsi ringkas (untuk kartu)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <textarea
            className="w-full rounded-xl border border-white/20 bg-transparent p-3 min-h-[200px]"
            placeholder="Konten (markdown/HTML bebas)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
