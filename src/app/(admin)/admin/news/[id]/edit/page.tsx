'use client'
import { useEffect, useState } from 'react'
import { AdminGuard } from '@/components/AdminGuard'
import { createClient } from '@/lib/supabase/client'
import { useParams, useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'

export default function EditNews() {
  const { id } = useParams<{ id: string }>()
  const supabase = createClient()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.from('news').select('*').eq('id', id).single()
      if (!error && data) {
        setTitle(data.title)
        setContent(data.content)
        setImageUrl(data.image_url ?? '')
      }
    }
    load()
  }, [id, supabase])

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('news')
      .update({ title, content, image_url: imageUrl || null })
      .eq('id', id)
    setLoading(false)
    if (!error) router.replace('/admin/news')
    else alert(error.message)
  }

  return (
    <AdminGuard>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Edit Berita</h1>
        <Card>
          <form onSubmit={save} className="space-y-3">
            <Input value={title} onChange={e=>setTitle(e.target.value)} required />
            <Textarea value={content} onChange={e=>setContent(e.target.value)} required />
            <Input value={imageUrl} onChange={e=>setImageUrl(e.target.value)} />
            <div className="flex gap-3">
              <Button type="submit" disabled={loading}>{loading ? 'Menyimpan…' : 'Simpan'}</Button>
            </div>
          </form>
        </Card>
      </div>
    </AdminGuard>
  )
}
