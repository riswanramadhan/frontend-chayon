import { createClient } from './supabase/client'

export async function uploadImage(
  file: File,
  folder: 'news' | 'courses'
): Promise<{ publicUrl: string; path: string }> {
  const supabase = createClient()

  // ⚙️ nama bucket—sesuaikan dengan yang kamu buat di Supabase Storage
  const bucket = 'Public'

  // Nama file unik dalam subfolder sesuai tipe konten
  const fileName = `${folder}/${crypto.randomUUID()}-${file.name}`

  // Upload
  const { error: uploadErr } = await supabase.storage.from(bucket).upload(fileName, file, {
    upsert: false, // supaya tidak menimpa file lama
  })

  if (uploadErr) {
    // Pesan lebih ramah jika bucket belum dibuat
    if (uploadErr.message.toLowerCase().includes('not found')) {
      throw new Error(`Bucket "${bucket}" belum dibuat di Supabase. Buat bucket tersebut dahulu.`)
    }
    throw uploadErr
  }

  // Ambil public URL
  const { data } = supabase.storage.from(bucket).getPublicUrl(fileName)

  // Kembalikan publicUrl dan path lengkap (bucket + path)
  return { publicUrl: data.publicUrl, path: `${bucket}/${fileName}` }
}
