"use client"

import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { courseWithCategory } from '@/components/courseWithCategory'

interface UiUxDesignCoursePageProps {
  articles: Course[];
  isLoading: boolean;
  error: string | null;
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  paginatedArticles: Course[];
}

function UiUxDesignCoursePage({
  searchKeyword,
  setSearchKeyword,
  currentPage,
  setCurrentPage,
  totalPages,
  paginatedArticles,
  isLoading,
  error
}: UiUxDesignCoursePageProps) {
  if (error) {
    return (
      <>
        <Head>
          <title>UI/UX Design - Chayon Online Course</title>
        </Head>
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Coba Lagi
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>UI/UX Design - Chayon Online Course</title>
      </Head>
      
      <main className="min-h-screen bg-gray-50">
        {/* Search Section */}
        <div className="flex flex-col items-center mt-16 space-y-12">
          <div className="flex items-center bg-white rounded-full px-6 py-3 w-[554px] shadow-sm">
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
              UI/UX Design
            </h1>
            <p className="text-gray-600 mb-12 text-base font-normal leading-[1.8]">
              Temukan berbagai wawasan seputar dunia UI/UX Design, mulai dari prinsip desain antarmuka, pengalaman pengguna, hingga tren dan tools terbaru. Dapatkan informasi eksklusif serta kisah inspiratif dari para desainer dan praktisi di bidang UI/UX.
            </p>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {paginatedArticles.length > 0 ? (
                  paginatedArticles.map((article, index) => (
                    <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                      <div className="relative h-48">
                        <Image
                          src={`${API_URL}/storage/artikel-thumbnails/${article.image.split('/').pop()}`}
                          alt={article.title}
                          layout="fill"
                          objectFit="cover"
                          onError={(e) => {
                            e.currentTarget.src = '/keyboard.svg';
                          }}
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="inline-block bg-gray-100 text-sm font-medium px-3 py-1 rounded-full">
                            UI/UX Design
                          </span>
                          <span className="text-sm text-gray-500">{article.title}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 leading-tight">{article.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{article.description}</p>
                        <Link 
                          // href={`/blog/${article.slug}`}
                          href={`/course-detail/${article.course_slug}`}
                          className="block w-full bg-black text-white text-center py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
                        >
                          Daftar Sekarang
                        </Link>
                      </div>
                    </div>
                  ))
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
              </div>

              {/* Pagination - Custom implementation matching course page style */}
              {totalPages > 1 && (
                <div className="flex justify-center mb-16">
                  <nav className="flex items-center space-x-2">
                    <button 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={`px-3 py-2 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'}`}
                      disabled={currentPage === 1}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {/* Dynamic page numbers based on totalPages */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1 ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'text-gray-700'} rounded-md hover:bg-blue-100`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button 
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={`px-3 py-2 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'}`}
                      disabled={currentPage === totalPages}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  )
}

export default courseWithCategory(UiUxDesignCoursePage, 'UI/UX Design');