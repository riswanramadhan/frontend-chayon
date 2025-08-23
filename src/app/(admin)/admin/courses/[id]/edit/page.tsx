'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AdminGuard } from '@/components/AdminGuard'
import { slugify } from '@/lib/slug'
import { Textarea } from '@/components/ui/Textarea'
import CategorySelect from '@/components/CategorySelect'
import { COURSE_CATEGORIES } from '@/lib/constants'
import UploadImage from '@/components/UploadImage'

type Row = {
  id: string
  title: string | null
  course_slug: string | null
  course_category: string | null
  description: string | null
  image_url: string | null
  gform_url: string | null
}

export default function EditCoursePage() {
  const supabase = createClient()
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const [row, setRow] = useState<Row | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('courses')
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
    const { error } = await supabase
      .from('courses')
      .update({
        title: row.title,
        course_slug: row.course_slug ? slugify(row.course_slug) : slugify(row.title || ''),
        course_category: row.course_category,
        description: row.description,
        image_url: row.image_url || null,
        gform_url: row.gform_url,
      })
      .eq('id', row.id)
    setSaving(false)
    if (error) { setErr(error.message); return }
    router.push('/admin/courses')
  }

  if (loading) return <AdminGuard><div>Memuat…</div></AdminGuard>
  if (!row) return <AdminGuard><div>Data tidak ditemukan.</div></AdminGuard>

  return (
    <AdminGuard>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold mb-4">Edit Kursus</h1>
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
            placeholder="Slug (opsional)"
            value={row.course_slug ?? ''}
            onChange={(e) => setRow({ ...row, course_slug: e.target.value })}
          />
          <CategorySelect
            value={row.course_category ?? ''}
            onChange={(v) => setRow({ ...row, course_category: v })}
            options={COURSE_CATEGORIES}
            label="Kategori"
          />
          <UploadImage
            folder="courses"
            value={row.image_url ?? ''}
            onChange={(url) => setRow({ ...row, image_url: url })}
          />
          <Textarea
            className="w-full rounded-xl border border-white/20 bg-transparent p-3 min-h-[90px]"
            placeholder="Deskripsi"
            value={row.description ?? ''}
            onChange={(e) => setRow({ ...row, description: e.target.value })}
          />
          <input
            className="w-full rounded-xl border border-white/20 bg-transparent p-3"
            placeholder="Link Google Form"
            value={row.gform_url ?? ''}
            onChange={(e) => setRow({ ...row, gform_url: e.target.value })}
            required
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-white text-black text-sm font-medium disabled:opacity-50 hover:bg-white/80"
            >
              {saving ? 'Menyimpan…' : 'Simpan'}
            </button>
            <button
              type="button"
              onClick={() => history.back()}
              className="px-4 py-2 rounded-xl border border-white/20 text-sm hover:bg-white/10"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </AdminGuard>
  )
}

