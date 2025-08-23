import { createClient } from './supabase/client'

export async function uploadImage(
  file: File,
  folder: 'news' | 'courses'
): Promise<{ publicUrl: string; path: string }> {
  const supabase = createClient()

  // ⚙️ Sesuaikan dengan nama bucket di Supabase (case-sensitive)
  const bucket = 'Public'

  // Nama file unik di subfolder sesuai tipe konten
  const fileName = `${folder}/${crypto.randomUUID()}-${file.name}`

  // Upload (tanpa overwrite)
  const { error: uploadErr } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, { upsert: false })

  if (uploadErr) {
    // Pesan lebih jelas jika bucket belum ada
    if (uploadErr.message.toLowerCase().includes('not found')) {
      throw new Error(`Bucket "${bucket}" belum dibuat di Supabase. Buat bucket tersebut dahulu.`)
    }
    throw uploadErr
  }

  // Ambil public URL
  const { data } = supabase.storage.from(bucket).getPublicUrl(fileName)

  // Kembalikan URL publik dan path lengkap (bucket/path)
  return { publicUrl: data.publicUrl, path: `${bucket}/${fileName}` }
}
