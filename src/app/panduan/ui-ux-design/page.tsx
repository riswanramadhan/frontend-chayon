"use client"

import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { withCategory } from '@/components/withCategory'
import { Article } from '@/lib/api'

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
  articles,
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
              UI/UX Design
            </h1>
            <p className="text-gray-600 mb-12 text-base font-normal leading-[1.8]">
            Temukan berbagai wawasan seputar dunia UI/UX Design, mulai dari prinsip desain antarmuka, pengalaman pengguna, hingga tren dan tools terbaru.
            Dapatkan informasi eksklusif serta kisah inspiratif dari para desainer dan praktisi di bidang UI/UX.
            </p>
          </div>

          {/* Article Grid */}
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
                  <p className="text-gray-600 mb-4">{article.description}</p>
                  <a 
                    href={`/blog/${article.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-2 ${pageNum === currentPage ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600'} rounded-md`}
                >
                  {pageNum}
                </button>
              ))}
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
        </div>
      </main>

    </>
  );
}

export default withCategory(UIUXDesignPage, 'UI/UX Design');
