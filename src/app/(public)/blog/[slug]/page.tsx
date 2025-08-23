import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data } = await supabase
    .from('news')
    .select('title,image_url')
    .eq('slug', params.slug)
    .single()
  if (!data) return { title: 'Berita' }
  return {
    title: data.title,
    openGraph: { images: data.image_url ? [data.image_url] : [] },
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { data } = await supabase.from('news').select('*').eq('slug', params.slug).single()
  if (!data) notFound()
  return (
    <div className="max-w-3xl mx-auto space-y-4 py-8">
      <h1 className="text-4xl font-bold">{data.title}</h1>
      {data.created_at && (
        <p className="text-sm text-gray-500">{formatDate ? formatDate(data.created_at) : data.created_at}</p>
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
