import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { PageProps } from '@/types/page'

type CourseRow = {
  title: string
  description: string | null
  image_url: string | null
  course_category: string | null
  course_slug: string
  gform_url: string | null
  price: number | null
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function generateMetadata({ params }: PageProps<{ course_slug: string }>): Promise<Metadata> {
   const { course_slug } = params
  const { data } = await supabase
    .from('courses')
    .select('title,image_url,description')
    .eq('course_slug', course_slug)
    .maybeSingle()

  const meta = data as Pick<CourseRow, 'title' | 'image_url' | 'description'> | null
  if (!meta) return { title: 'Kursus' }

  return {
    title: meta.title,
    description: meta.description ?? undefined,
    openGraph: { images: meta.image_url ? [meta.image_url] : [] },
  }
}

function formatIDR(n?: number | null) {
  if (!n || n <= 0) return 'Gratis'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n)
}

export default async function Page({ params }: PageProps<{ course_slug: string }>) {
  const { course_slug } = await params
  const { data } = await supabase
    .from('courses')
    .select('*')
    .eq('course_slug', course_slug)
    .maybeSingle()

  const course = data as CourseRow | null
  if (!course) notFound()

  return (
    <div className="min-h-screen bg-white pb-24">{/* padding bawah agar aman dari footer */}
      {/* Heading */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-10 md:pt-16">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          {course.course_category && (
            <span className="inline-flex items-center rounded-full bg-black text-white text-xs md:text-sm px-3 py-1">
              {course.course_category}
            </span>
          )}
          <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-800 text-xs md:text-sm px-3 py-1">
            {formatIDR(course.price)}
          </span>
        </div>

        <h1 className="text-[28px] md:text-5xl font-bold leading-tight text-gray-900">
          {course.title}
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 mt-8 md:mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Left: Gambar + CTA dalam satu card */}
          <div className="bg-pink-50 rounded-2xl shadow-sm p-4 md:p-6">
            <div className="relative w-full aspect-[16/10] md:aspect-[4/3]">
              {course.image_url ? (
                <>
                  <div className="absolute top-0 right-0 z-10 bg-black text-white text-xs px-2 py-1 rounded-bl-lg">
                    {formatIDR(course.price)}
                  </div>
                  <Image
                    src={course.image_url}
                    alt={course.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </>
              ) : (
                <div className="absolute inset-0 grid place-items-center text-gray-400">
                  No image
                </div>
              )}
            </div>

            {/* CTA ditempatkan di bawah gambar, masih di dalam card kiri */}
            {course.gform_url && (
              <a
                href={course.gform_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block"
                aria-label="Daftar Sekarang"
              >
                <div className="w-full">
                  <div className="bg-black text-white text-center font-semibold rounded-full py-4 md:py-5 shadow hover:bg-gray-900 transition">
                    Daftar Sekarang
                  </div>
                </div>
              </a>
            )}
          </div>

          {/* Right: Deskripsi */}
          <div className="bg-pink-50/90 rounded-2xl border border-pink-100 shadow p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Tentang {course.title}
            </h2>
            {course.description && (
              <p className="mt-4 text-gray-700 leading-relaxed">
                {course.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
