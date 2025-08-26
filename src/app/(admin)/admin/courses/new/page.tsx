'use client'
import { useState } from 'react'
import { AdminGuard } from '@/components/AdminGuard'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { slugify } from '@/lib/slug'
import CategorySelect from '@/components/CategorySelect'
import { COURSE_CATEGORIES } from '@/lib/constants'
import UploadImage from '@/components/UploadImage'

export default function NewCourse() {
  const supabase = createClient()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [gform, setGform] = useState('')
  const [price, setPrice] = useState('')
  const [loading, setLoading] = useState(false)

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('courses').insert({
      title,
      course_slug: slugify(title),
      course_category: category || null,
      description: description || null,
      image_url: imageUrl || null,
      gform_url: gform,
      price: price ? Number(price) : null,
    })
    setLoading(false)
    if (!error) router.replace('/admin/courses')
    else alert(error.message)
  }

  return (
    <AdminGuard>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Tambah Kursus</h1>
        <Card>
          <form onSubmit={save} className="space-y-3">
          <Input placeholder="Judul" value={title} onChange={e=>setTitle(e.target.value)} required />
          <CategorySelect
            value={category}
            onChange={setCategory}
            options={COURSE_CATEGORIES}
            label="Kategori"
          />
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-white/20 bg-white/10 text-sm text-white">
              Rp
            </span>
            <Input
              type="number"
              placeholder="Harga Kursus"
              value={price}
              onChange={e=>setPrice(e.target.value)}
              className="rounded-l-none border-l-0 border-white/20 bg-transparent"
            />
          </div>
          <UploadImage folder="courses" value={imageUrl} onChange={setImageUrl} />
            <Textarea placeholder="Deskripsi (opsional)" value={description} onChange={e=>setDescription(e.target.value)} />
            <Input placeholder="Link Google Form" value={gform} onChange={e=>setGform(e.target.value)} required />
            <Button type="submit" disabled={loading}>{loading ? 'Menyimpan…' : 'Simpan'}</Button>
          </form>
        </Card>
      </div>
    </AdminGuard>
  )
}