'use client'

import React, { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SafeImage } from './SafeImage'

import CategoryBar from './CategoryBar'
import { ArticleCard } from './ArticleCard'
import { Newsletter } from './ui/Newsletter'
import { ErrorMessage } from './ui/ErrorMessage'
import { Pagination } from './ui/Pagination'
import { LoadingArticles } from './ui/LoadingArticles'
import type { Article, Course } from '@/lib/api'
import { getAllArticles, getAllCourses, getCategories } from '@/lib/api'

const categoryImageMap: Record<string, string> = {
  'Digital Marketing': 'keyboard.svg',
  'Machine Learning': 'ddos.svg',
  'UI/UX Design': 'browser.svg',
  'Melamar Kerja': 'notes.svg',
  'Lintas Minat': 'hacking.svg',
  'Jenjang Karir': 'wordle.svg',
}

interface Category {
  id: string
  name: string
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [currentArticlePage, setCurrentArticlePage] = useState(1)
  const [currentCoursePage, setCurrentCoursePage] = useState(1)
  const [selectedNewsCategory, setSelectedNewsCategory] = useState('all')
  const [selectedCourseCategory, setSelectedCourseCategory] = useState('all')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [showCopyFeedback, setShowCopyFeedback] = useState<string | null>(null)

  const [newsCategories, setNewsCategories] = useState<Category[]>([])
  const [courseCategories, setCourseCategories] = useState<Category[]>([])

  const ITEMS_PER_PAGE = 6

  const loadData = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)
      const [articleData, courseData, newsCats, courseCats] = await Promise.all([
        getAllArticles(),
        getAllCourses(),
        getCategories('news'),
        getCategories('course'),
      ])

      setArticles(articleData)
      setCourses(courseData)

      // id kategori → lowercase agar konsisten saat filter
      setNewsCategories([
        { id: 'all', name: 'Show All' },
        ...newsCats.map((c) => ({ id: c.name.toLowerCase(), name: c.name })),
      ])

      setCourseCategories([
        { id: 'all', name: 'Show All' },
        ...courseCats.map((c) => ({ id: c.name.toLowerCase(), name: c.name })),
      ])
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === 'string'
            ? err
            : 'Gagal memuat data'
      console.error('Error loading data:', err)
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const newsCategoryOptions = newsCategories
  const courseCategoryOptions = courseCategories

  // --- FILTER ARTIKEL ---
  const keyword = searchKeyword.trim().toLowerCase()
  const normalizedSelectedNews = (selectedNewsCategory || 'all').toLowerCase().trim()

  const filteredByCategory =
    normalizedSelectedNews === 'all'
      ? articles
      : articles.filter(
          (a) => (a.category?.toLowerCase().trim() ?? '') === normalizedSelectedNews,
        )

  const filteredArticles = keyword
    ? filteredByCategory.filter(
        (a) =>
          a.title.toLowerCase().includes(keyword) ||
          (a.description?.toLowerCase().includes(keyword) ?? false),
      )
    : filteredByCategory

  const totalArticlePages = Math.max(1, Math.ceil(filteredArticles.length / ITEMS_PER_PAGE))
  const articleStartIndex = (currentArticlePage - 1) * ITEMS_PER_PAGE
  const paginatedArticles = filteredArticles.slice(
    articleStartIndex,
    articleStartIndex + ITEMS_PER_PAGE,
  )

  // --- FILTER & PAGINATION KURSUS ---
  const normalizedSelectedCourse = (selectedCourseCategory || 'all').toLowerCase().trim()

  const filteredCourses =
    normalizedSelectedCourse === 'all'
      ? courses
      : courses.filter(
          (c) => (c.course_category?.toLowerCase().trim() ?? '') === normalizedSelectedCourse,
        )

  const totalCoursePages = Math.max(1, Math.ceil(filteredCourses.length / ITEMS_PER_PAGE))
  const courseStartIndex = (currentCoursePage - 1) * ITEMS_PER_PAGE
  const paginatedCourses = filteredCourses.slice(
    courseStartIndex,
    courseStartIndex + ITEMS_PER_PAGE,
  )

  // Reset halaman saat ganti filter
  useEffect(() => {
    setCurrentArticlePage(1)
  }, [selectedNewsCategory, searchKeyword])

  useEffect(() => {
    setCurrentCoursePage(1)
  }, [selectedCourseCategory])

  // Featured mengikuti filter (bukan selalu artikel[0])
  const mainArticle = filteredArticles[0]

  const handleCopyLink = useCallback((slug: string) => {
    const url = `https://chayon.com/blog/${slug}`
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setShowCopyFeedback(slug)
        setTimeout(() => setShowCopyFeedback(null), 2000)
      })
      .catch((err) => {
        console.error('Failed to copy:', err)
      })
  }, [])

  if (isLoading) return <LoadingArticles />
  if (error) {
    return (
      <main className="mx-auto max-w-6xl px-4 md:px-6 py-12">
        <ErrorMessage message={error} />
      </main>
    )
  }

  // Search bar: garis + glow saat fokus & ketika mengetik
  const searchActive = keyword.length > 0
  const searchWrapperClass = [
    'flex items-center bg-white rounded-full px-6 py-3 w-[554px] max-w-[90vw] border transition-all duration-200',
    searchActive ? 'border-blue-500 ring-2 ring-blue-500 shadow-md' : 'border-gray-300',
    'focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:shadow-md',
  ].join(' ')

  return (
    <>
      {/* Search */}
      <div className="flex flex-col items-center mt-16 space-y-12">
        <div className={searchWrapperClass}>
          <Image
            src="/search.svg"
            width={24}
            height={24}
            alt="Search Icon"
            className="mr-3"
          />
          <input
            type="text"
            placeholder="Pencarian"
            className="outline-none text-gray-700 text-lg font-light w-full bg-transparent"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
      </div>

      {/* Hero */}
      <div className="w-full bg-gradient-to-b from-white/50 to-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-black/80 mb-2">
              Chayon Online Course
              <Image
                src="/sparkle.svg"
                width={24}
                height={24}
                alt="Sparkle Icon"
                className="inline-block ml-2"
              />
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Explore Knowledge & Insights
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Temukan berbagai wawasan seputar dunia teknologi, kursus online,
              dan perkembangan terbaru. Dapatkan informasi eksklusif, serta kisah
              inspiratif dari narasumber kami.
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-0">
        {/* Latest Articles */}
        <section className="mb-16">
          <CategoryBar
            categories={newsCategoryOptions}
            selectedCategory={selectedNewsCategory}
            onCategoryChange={(val: string) => setSelectedNewsCategory(val.toLowerCase())}
          />

          {/* Featured mengikuti kategori & keyword */}
          {mainArticle && (
            <div className="mb-8 mt-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-[400px]">
                    <SafeImage
                      src={mainArticle.image_url ?? ''}
                      alt={mainArticle.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="inline-block bg-gray-100 text-sm font-medium px-3 py-1 rounded-full">
                          {mainArticle.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {mainArticle.date}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4">
                        {mainArticle.title}
                      </h3>
                      <p className="text-gray-600 mb-6 line-clamp-3">
                        {mainArticle.description}
                      </p>
                    </div>

                    <div>
                      {/* Share */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs text-gray-500">Bagikan:</span>
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            'https://chayon.com/blog/' + mainArticle.slug,
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-700"
                        >
                          <Image src="/facebook.svg" width={20} height={20} alt="Facebook" />
                        </a>
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(
                            mainArticle.title + ' https://chayon.com/blog/' + mainArticle.slug,
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-green-600"
                        >
                          <Image src="/whatsapp.svg" width={20} height={20} alt="WhatsApp" />
                        </a>
                        <a
                          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                            'https://chayon.com/blog/' + mainArticle.slug,
                          )}&text=${encodeURIComponent(mainArticle.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-500"
                        >
                          <Image src="/twitter.svg" width={20} height={20} alt="Twitter" />
                        </a>
                        <a
                          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                            'https://chayon.com/blog/' + mainArticle.slug,
                          )}&title=${encodeURIComponent(mainArticle.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-800"
                        >
                          <Image src="/linkedin.svg" width={20} height={20} alt="LinkedIn" />
                        </a>
                        <div className="relative">
                          <button
                            onClick={() => handleCopyLink(mainArticle.slug)}
                            className="hover:text-gray-600 transition-colors"
                          >
                            <Image src="/link.svg" width={20} height={20} alt="Copy Link" />
                          </button>
                          {showCopyFeedback === mainArticle.slug && (
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              Link Copied
                            </div>
                          )}
                        </div>
                      </div>

                      <Link
                        href={`/blog/${mainArticle.slug}`}
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        Baca Selengkapnya
                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grid artikel (ikut filter kategori & keyword) */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {paginatedArticles.length > 0 ? (
    paginatedArticles.map((article) => (
      <ArticleCard key={article.id} article={article} />
    ))
  ) : (
    <>
      <p className="col-span-full mt-12 text-center text-xl font-semibold text-gray-700">
        Tidak ada artikel yang cocok
      </p>
      <p className="col-span-full text-center text-sm text-gray-500">
        Coba ubah kata kunci atau pilih kategori lain.
      </p>
    </>
  )}
</div>


          {/* Pagination artikel */}
          <div className="mt-8">
            <Pagination
              currentPage={currentArticlePage}
              totalPages={totalArticlePages}
              onPageChange={(p: number) => {
                setCurrentArticlePage(p)
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}
            />
          </div>
        </section>

        {/* Join Our Learning Journey */}
        <div className="w-full py-16 bg-gray-50 -mx-4 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
                Join Our Learning Journey
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Mulai perjalanan belajarmu bersama Chayon! Pilih kursus yang
                sesuai, tingkatkan skill, dan wujudkan potensimu. Daftar sekarang
                dan jadilah bagian dari komunitas pembelajar!
              </p>
            </div>

            {/* Category kursus */}
            <div className="mb-8">
              <CategoryBar
                categories={courseCategoryOptions}
                selectedCategory={selectedCourseCategory}
                onCategoryChange={(val: string) => setSelectedCourseCategory(val.toLowerCase())}
              />
            </div>

            {/* grid kursus */}
            {paginatedCourses.length === 0 ? (
              <p className="text-center text-gray-500">
                Tidak ada kursus untuk filter saat ini.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedCourses.map((course) => {
                  const fallback =
                    `/icons/${categoryImageMap[course.course_category || ''] ?? 'browser.svg'}`
                  const imageSrc = course.image_url || fallback
                  return (
                    <div
                      key={course.id}
                      className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100"
                    >
                      <div className="relative h-[200px]">
                        <Image src={imageSrc} alt={course.title} fill className="object-cover" />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="inline-block bg-gray-100 text-xs font-medium px-3 py-1 rounded-full">
                            {course.course_category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">{course.title}</h3>
                        <p className="text-gray-600 mb-5 line-clamp-3">{course.description}</p>
                        <Link
                          href={`/course-detail/${course.course_slug}`}
                          className="block w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center"
                        >
                          Daftar Sekarang
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Pagination kursus */}
            <div className="mt-8">
              <Pagination
                currentPage={currentCoursePage}
                totalPages={totalCoursePages}
                onPageChange={(p: number) => {
                  setCurrentCoursePage(p)
                  if (typeof window !== 'undefined') {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                }}
              />
            </div>
          </div>
        </div>
      </main>

      {/* newsletter */}
      <Newsletter />
    </>
  )
}
