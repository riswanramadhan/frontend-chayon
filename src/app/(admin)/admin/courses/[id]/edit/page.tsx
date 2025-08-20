'use client'

import { useState } from 'react'
import { Input, Button, Card, Textarea } from '@/components/ui'

export default function EditCoursePage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ title, description })
    // TODO: simpan ke Supabase
  }

  return (
    <Card className="max-w-2xl mx-auto mt-10">
      <h1 className="text-xl font-semibold mb-4">Edit Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Course title"
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Course description"
        />
        <Button type="submit">Save</Button>
      </form>
    </Card>
  )
}
