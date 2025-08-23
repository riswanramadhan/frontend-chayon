import { createClient } from './supabase/client'

export async function uploadImage(
  file: File,
  folder: 'news' | 'courses'
): Promise<{ publicUrl: string; path: string }> {
  const supabase = createClient()
  const bucket = 'public'
  const fileName = `${folder}/${crypto.randomUUID()}-${file.name}`
  const { error } = await supabase.storage.from(bucket).upload(fileName, file)
  if (error) {
    if (error.message.toLowerCase().includes('not found')) {
      throw new Error('Bucket belum dibuat di Supabase')
    }
    throw error
  }
  const { data } = supabase.storage.from(bucket).getPublicUrl(fileName)
  return { publicUrl: data.publicUrl, path: `${bucket}/${fileName}` }
}
