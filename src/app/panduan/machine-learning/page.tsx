"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Newsletter } from '@/components/ui/Newsletter'
import { withCategory } from '@/components/withCategory'
import { Article } from '@/lib/api'

interface MachineLearningPageProps {
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

function MachineLearningPage({
  articles,
  searchKeyword,
  setSearchKeyword,
  currentPage,
  setCurrentPage,
  totalPages,
  paginatedArticles
}: MachineLearningPageProps) {
  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-8">Machine Learning</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Pelajari dasar-dasar machine learning dan implementasinya dalam dunia nyata.
          </p>

          {/* Search Section */}
          <div className="flex flex-col items-center mt-8 mb-12 space-y-8">
            <div className="flex items-center bg-white rounded-full px-6 py-3 w-full max-w-[554px]">
              <Image src="/search.svg" width={24} height={24} alt="Search Icon" className="mr-3" />
              <input 
                type="text" 
                placeholder="Cari artikel machine learning..." 
                className="outline-none text-gray-500 text-lg font-light w-full"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
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
        </div>
      </main>
    </>
  )
}

export default withCategory(MachineLearningPage, 'Machine Learning');
