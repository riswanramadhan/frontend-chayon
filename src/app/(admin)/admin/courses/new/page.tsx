'use client'
import { useState } from 'react'
import { AdminGuard } from '@/components/AdminGuard'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'

export default function NewCourse() {
  const supabase = createClient()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [gform, setGform] = useState('')
  const [loading, setLoading] = useState(false)

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('courses').insert({
      title, description: description || null, gform_url: gform
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
            <Textarea placeholder="Deskripsi (opsional)" value={description} onChange={e=>setDescription(e.target.value)} />
            <Input placeholder="Link Google Form" value={gform} onChange={e=>setGform(e.target.value)} required />
            <Button type="submit" disabled={loading}>{loading ? 'Menyimpan…' : 'Simpan'}</Button>
          </form>
        </Card>
      </div>
    </AdminGuard>
  )
}
