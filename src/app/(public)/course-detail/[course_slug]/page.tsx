import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function generateMetadata({ params }: { params: Promise<{ course_slug: string }> }): Promise<Metadata> {
  const { course_slug } = await params
  const { data } = await supabase
    .from('courses')
    .select('title,image_url')
    .eq('course_slug', course_slug)
    .single()
  if (!data) return { title: 'Kursus' }
  return {
    title: data.title,
    openGraph: { images: data.image_url ? [data.image_url] : [] },
  }
}

export default async function Page({ params }: { params: Promise<{ course_slug: string }> }) {
  const { course_slug } = await params
  const { data } = await supabase
    .from('courses')
    .select('*')
    .eq('course_slug', course_slug)
    .single()
  if (!data) notFound()
  return (
    <div className="max-w-3xl mx-auto space-y-4 py-8">
      {data.course_category && (
        <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm">
          {data.course_category}
        </span>
      )}
      <h1 className="text-4xl font-bold">{data.title}</h1>
      {data.image_url && (
        <div className="relative w-full h-64">
          <Image src={data.image_url} alt={data.title} fill className="object-cover rounded-md" />
        </div>
      )}
      {data.description && <p>{data.description}</p>}
      {data.gform_url && (
        <a
          href={data.gform_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Daftar Sekarang
        </a>
      )}
    </div>
  )
}
