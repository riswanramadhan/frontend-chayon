'use client'

import { useState, DragEvent } from 'react'
import Image from 'next/image'
import { uploadImage } from '@/lib/storage'

interface Props {
  value?: string
  onChange: (url: string) => void
  folder: 'news' | 'courses'
}

export default function UploadImage({ value, onChange, folder }: Props) {
  const [preview, setPreview] = useState<string | undefined>(value)
  const [uploading, setUploading] = useState(false)

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) { alert('File harus gambar'); return }
    if (file.size > 5 * 1024 * 1024) { alert('Maksimal 5MB'); return }
    setUploading(true)
    try {
      const { publicUrl } = await uploadImage(file, folder)
      setPreview(publicUrl)
      onChange(publicUrl)
    } catch (e) {
      alert((e as Error).message)
    } finally {
      setUploading(false)
    }
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) void handleFile(file)
  }

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) void handleFile(file)
  }

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="space-y-2">
          <div className="relative w-48 h-48">
            <Image src={preview} alt="Preview" fill className="object-cover rounded-md" />
          </div>
          <div className="flex gap-2 text-sm">
            <button type="button" onClick={() => document.getElementById('upload-input')?.click()} className="underline">Ganti</button>
            <button type="button" onClick={() => { setPreview(undefined); onChange('') }} className="underline text-red-500">Hapus</button>
          </div>
        </div>
      ) : (
        <label
          htmlFor="upload-input"
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-white/20 p-4 text-center text-sm"
        >
          <input id="upload-input" type="file" accept="image/*" className="hidden" onChange={onInputChange} />
          {uploading ? 'Mengunggah…' : 'Seret atau pilih gambar'}
        </label>
      )}
    </div>
  )
}
