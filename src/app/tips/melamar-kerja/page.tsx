"use client"

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { Newsletter } from '@/components/ui/Newsletter'
import { useState } from 'react'
import Head from 'next/head'

export default function MelamarKerjaPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');

  // Sample blog posts data matching the image
  const posts = Array(9).fill({
    title: "Rahasia Sukses Melamar Kerja di Era Digital",
    date: "12 Apr 2025",
    category: "Melamar Kerja",
    description: "Pelajari teknik permintaan online untuk membangun brand dan menjangkau lebih banyak pelamar.",
    image: "/notes.svg"
  });

  // Filter posts based on search
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    post.description.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Melamar Kerja - Chayon Online Course</title>
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
              Melamar Kerja
            </h1>
            <p className="text-gray-600 mb-12 text-base font-normal leading-[1.8]">
              Temukan berbagai wawasan seputar dunia pencarian kerja, mulai dari tips menulis CV yang 
              menarik, strategi menghadapi wawancara, hingga tips rekrutmen terbaru. Dapatkan informasi 
              eksklusif serta kisah inspiratif dari para pencari kerja dan profesional HR.
            </p>
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredPosts.map((post, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="inline-block bg-gray-100 text-xs font-medium px-3 py-1 rounded-full">{post.category}</span>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="font-bold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.description}</p>
                  <Link 
                    href="/blog/rahasia-sukses-melamar-kerja-di-era-digital" 
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                    Baca Selengkapnya
                  </Link>
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
              {[1, 2, 3, 4, 5].map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 ${currentPage === page ? 'bg-blue-600 text-white rounded-md' : 'text-gray-700 hover:bg-gray-100 rounded-md'}`}
                >
                  {page}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(Math.min(5, currentPage + 1))}
                className={`px-3 py-2 ${currentPage === 5 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'}`}
                disabled={currentPage === 5}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </main>

      <Newsletter />
      <Footer />
    </>
  );
}
