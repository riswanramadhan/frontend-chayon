// src/lib/api.ts
'use client'

import { createClient } from '@supabase/supabase-js'

/** Tipe artikel yang dipakai komponen FE */
export type Article = {
  id: string
  title: string
  slug: string
  category: string
  description: string
  image_url: string | null
  date: string
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/** Ambil semua artikel dari tabel `news` di Supabase */
export async function getAllArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('news')
    .select('id,title,slug,category,description,content,image_url,created_at')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[getAllArticles] Supabase error:', error)
    // propagasikan pesan error yang jelas ke UI
    throw new Error(error.message || 'Gagal memuat artikel')
  }

  return (data ?? []).map((row: any) => ({
    id: row.id,
    title: row.title ?? 'Tanpa Judul',
    slug: row.slug ?? slugify(row.title ?? 'tanpa-judul'),
    category: row.category ?? 'General',
    description: row.description ?? row.content ?? '',
    image_url: row.image_url ?? null,
    date: row.created_at ?? new Date().toISOString(),
  }))
}
