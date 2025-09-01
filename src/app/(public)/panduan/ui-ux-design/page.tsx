"use client"

import Link from 'next/link'
import Head from 'next/head'
import { Article } from '@/lib/api'
import { Pagination } from '@/components/ui/Pagination'
import { withCategory } from '@/components/withCategory'
import { SafeImage } from '@/components/SafeImage'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'

interface UIUXDesignPageProps {
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

function UIUXDesignPage({
  // articles,
  searchKeyword,
  setSearchKeyword,
  currentPage,
  setCurrentPage,
  totalPages,
  paginatedArticles
}: UIUXDesignPageProps) {
  return (
    <>
      <Head>
        <title>UI/UX Design - Chayon Online Course</title>
      </Head>
      
      <main className="min-h-screen bg-gray-50">
  {/* Search Section */}
  <div className="flex flex-col items-center mt-16 space-y-12">
    <div
      className={[
        "flex items-center bg-white rounded-full px-6 py-3 w-[554px] max-w-[90vw]",
        "border transition-all duration-200",
        // glow saat mengetik
        searchKeyword.trim().length
          ? "border-blue-500 ring-2 ring-blue-500 shadow-md"
          : "border-gray-300",
        // glow saat fokus
        "focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:shadow-md",
      ].join(" ")}
    >
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
          className="w-full text-lg font-light text-gray-700 bg-transparent outline-none focus:outline-none"
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
                UI/UX Design
              </h1>
              <p className="text-gray-600 mb-12 text-base font-normal leading-[1.8]">
              Temukan berbagai wawasan seputar dunia UI/UX Design, mulai dari prinsip desain antarmuka, pengalaman pengguna, hingga tren dan tools terbaru.
              Dapatkan informasi eksklusif serta kisah inspiratif dari para desainer dan praktisi di bidang UI/UX.
              </p>
            </div>
  
            {/* Article Grid */}
            {paginatedArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {paginatedArticles.map((article, index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                    <div className="relative h-48 w-full">
                      <SafeImage
                        src={article.image_url ?? ''}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <span className="text-sm text-gray-500">{formatDate(article.date)}</span>
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
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">Tidak ada artikel yang ditemukan.</p>
                {searchKeyword && (
                  <p className="text-gray-400 mt-2">
                    Coba kata kunci lain atau hapus filter pencarian.
                  </p>
                )}
              </div>
            )}
  
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
    );
  }
  
  export default withCategory(UIUXDesignPage, 'UI/UX Design');