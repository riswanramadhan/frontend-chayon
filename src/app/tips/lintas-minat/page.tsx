"use client"

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { Newsletter } from '@/components/ui/Newsletter'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { getArticlesByCategory, Article } from '@/lib/api'
import { LoadingArticles } from '@/components/ui/LoadingArticles'
import { ErrorMessage } from '@/components/ui/ErrorMessage'

export default function LintasMinatPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        const data = await getArticlesByCategory('Lintas Minat');
        setArticles(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load articles');
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  // Filter articles based on search
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    article.description.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  // Pagination
  const articlesPerPage = 6;
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  return (
    <>
      <Head>
        <title>Lintas Minat - Chayon Online Course</title>
      </Head>
      <Navbar />
      
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
              Lintas Minat
            </h1>
            <p className="text-gray-600 mb-12 text-base font-normal leading-[1.8]">
              Temukan berbagai wawasan menarik dari beragam bidang lintas minat, mulai dari teknologi, seni, bisnis hingga gaya hidup.
              Dapatkan informasi eksklusif serta kisah-inspiratif dari narasumber dengan latar belakang dan keahlian yang beragam.
            </p>
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {loading ? (
              <LoadingArticles />
            ) : error ? (
              <ErrorMessage message={error} />
            ) : currentArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                <div className="relative h-48">
                  <Image
                    src={`/${article.image}`}
                    alt={article.title}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="inline-block bg-gray-100 text-sm font-medium px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-500">{article.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.description}</p>
                  <Link 
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    Baca Selengkapnya
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {!loading && !error && (
            <div className="flex justify-center mb-16">
              <nav className="flex items-center space-x-2">
                <button 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={`px-3 py-2 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'}`}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 ${currentPage === page ? 'bg-blue-600 text-white' : 'text-blue-600 hover:text-blue-800'} rounded`}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className={`px-3 py-2 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'}`}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </main>

      <Newsletter />
      <Footer />
    </>
  );
}
