"use client"

import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { Article } from '@/lib/api'
import { Pagination } from '@/components/ui/Pagination'
import { withCategory } from '@/components/withCategory'

interface DigitalMarketingPageProps {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  paginatedArticles: Article[];
}

function DigitalMarketingPage({
  articles,
  searchKeyword,
  setSearchKeyword,
  currentPage,
  setCurrentPage,
  totalPages,
  paginatedArticles
}: DigitalMarketingPageProps) {
  return (
    <>
      <Head>
        <title>Digital Marketing - Chayon Online Course</title>
      </Head>
      
      <main className="min-h-screen bg-white">
        {/* Search Section */}
        <div className="flex flex-col items-center mt-16 space-y-12">
          <div className="flex items-center bg-white rounded-full px-6 py-3 w-[554px]">
            <Image src="/search.svg" width={24} height={24} alt="Search Icon" className="mr-3" />
            <input 
              type="text" 
              placeholder="Pencarian" 
              className="outline-none text-gray-500 text-lg font-light w-full"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
        </div>

        {/* Category Header */}
        <div className="container mx-auto px-4 mt-16">
          <div className="max-w-[800px] mx-auto text-center">
            <span className="text-sm font-medium text-black-500 mb-2 block">Kategori</span>
            <h1 className="text-6xl font-bold text-gray-900 leading-tight mb-4">
              Digital Marketing
            </h1>
            <p className="text-gray-600 mb-12 text-base font-normal leading-[1.8]">
            Temukan berbagai wawasan seputar dunia digital marketing, mulai dari strategi pemasaran online, tren terbaru, hingga tools yang wajib dikuasai.
            Dapatkan informasi eksklusif serta kisah inspiratif dari para praktisi dan ahli di bidang digital marketing.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {paginatedArticles.map((article, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                <div className="relative h-48 w-full">
                  <Image
                    src={`/${article.image}`}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-sm text-gray-500">{article.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>
                  <Link href={`/blog/${article.slug}`} className="text-blue-600 hover:text-blue-800 font-medium">
                    Baca Selengkapnya →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8">
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>
    </>
  )
}

export default withCategory(DigitalMarketingPage, 'Digital Marketing');
