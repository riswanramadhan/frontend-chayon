import { createClient } from './supabase/client'

export async function uploadImage(
  file: File,
  folder: 'news' | 'courses'
): Promise<{ publicUrl: string; path: string }> {
  const supabase = createClient()
  const fileName = `${folder}/${crypto.randomUUID()}-${file.name}`
  const { error } = await supabase.storage.from('public').upload(fileName, file)
  if (error) throw error
  const { data } = supabase.storage.from('public').getPublicUrl(fileName)
  return { publicUrl: data.publicUrl, path: fileName }
}
