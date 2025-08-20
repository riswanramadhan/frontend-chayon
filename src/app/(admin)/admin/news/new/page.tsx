'use client'
import { useState } from 'react'
import { AdminGuard } from '@/components/AdminGuard'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'

export default function NewNews() {
  const supabase = createClient()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('news').insert({ title, content, image_url: imageUrl || null })
    setLoading(false)
    if (!error) router.replace('/admin/news')
    else alert(error.message)
  }

  return (
    <AdminGuard>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Tambah Berita</h1>
        <Card>
          <form onSubmit={save} className="space-y-3">
            <Input placeholder="Judul" value={title} onChange={e=>setTitle(e.target.value)} required />
            <Textarea placeholder="Isi berita" value={content} onChange={e=>setContent(e.target.value)} required />
            <Input placeholder="Image URL (opsional)" value={imageUrl} onChange={e=>setImageUrl(e.target.value)} />
            <Button type="submit" disabled={loading}>{loading ? 'Menyimpan…' : 'Simpan'}</Button>
          </form>
        </Card>
      </div>
    </AdminGuard>
  )
}
