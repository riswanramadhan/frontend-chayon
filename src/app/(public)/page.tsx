'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

type News = {
  id: string
  title: string
  content: string
  image_url: string | null
}

export default function HomePage() {
  const [news, setNews] = useState<News[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(9)
      if (!error && data) setNews(data)
      if (error) console.error(error)
    }
    fetchNews()
  }, [supabase])

  const emptyFallback: News[] = news.length
    ? news
    : [
        { id: '1', title: 'Selamat datang di Chayon', content: 'Tempat belajar yang ringkas dan rapi.', image_url: null },
        { id: '2', title: 'Tips: UI rapi = fokus', content: 'Jaga kontras, white space, dan hirarki.', image_url: null },
        { id: '3', title: 'Panduan Supabase', content: 'Setup cepat untuk auth & database.', image_url: null },
      ]

  return (
    <div className="py-10">
      {/* Hero */}
      <section className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-12 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Belajar bareng, <span className="text-white/70">tanpa ribet.</span>
        </h1>
        <p className="text-white/70 mt-3 max-w-2xl">
          Chayon merangkum kursus, panduan, dan tips—biar kamu fokus ke praktik.
        </p>
        <div className="mt-6 flex gap-3">
          <a href="/kursus" className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium">
            Lihat Kursus
          </a>
          <a href="/panduan" className="px-4 py-2 rounded-lg text-sm font-medium border border-white/20">
            Panduan
          </a>
        </div>
      </section>

      {/* Grid berita */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-xl font-semibold">Berita Terbaru</h2>
          <span className="text-xs text-white/50">Auto dari Supabase</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {emptyFallback.map(post => (
            <article
              key={post.id}
              className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-4"
            >
              {post.image_url ? (
                <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-lg">
                  <Image src={post.image_url} alt={post.title} fill className="object-cover" />
                </div>
              ) : (
                <div className="mb-3 aspect-[16/9] rounded-lg bg-white/10" />
              )}
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-white/70 line-clamp-3 mt-1">{post.content}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
