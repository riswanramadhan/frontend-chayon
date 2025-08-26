import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

/** Warna chip per kategori (case-insensitive) */
const categoryStyleMap: Record<string, string> = {
  'digital marketing': 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  'machine learning': 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  'ui/ux design': 'bg-violet-50 text-violet-700 ring-1 ring-violet-200',
  'melamar kerja': 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  'lintas minat': 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
  'jenjang karir': 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200',
}
const getCategoryChipClass = (name?: string | null) => {
  if (!name) return 'bg-gray-100 text-gray-800'
  const key = name.trim().toLowerCase()
  return categoryStyleMap[key] ?? 'bg-gray-100 text-gray-800'
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data } = await supabase
    .from('news')
    .select('title,image_url') // kategori tidak wajib untuk metadata
    .eq('slug', params.slug)
    .single()
  if (!data) return { title: 'Berita' }
  return {
    title: data.title,
    openGraph: { images: data.image_url ? [data.image_url] : [] },
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { data } = await supabase
    .from('news')
    .select('*') // pastikan kolom `category` memang ada di tabel news
    .eq('slug', params.slug)
    .single()

  if (!data) notFound()

  return (
    <div className="max-w-3xl mx-auto space-y-4 py-8">
      {/* Chip kategori */}
      {data.category && (
        <span
          className={[
            'inline-block rounded-full px-3 py-1 text-xs font-medium',
            getCategoryChipClass(data.category),
          ].join(' ')}
        >
          {data.category}
        </span>
      )}

      <h1 className="text-4xl font-bold">{data.title}</h1>

      {data.created_at && (
        <p className="text-sm text-gray-500">
          {formatDate ? formatDate(data.created_at) : data.created_at}
        </p>
      )}

      {data.image_url && (
        <div className="relative w-full h-64">
          <Image src={data.image_url} alt={data.title} fill className="object-cover rounded-md" />
        </div>
      )}

      {data.description && <p>{data.description}</p>}

      {data.content && (
        <div className="prose" dangerouslySetInnerHTML={{ __html: data.content as string }} />
      )}
    </div>
  )
}
