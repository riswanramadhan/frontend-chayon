"use client"

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { Newsletter } from '@/components/ui/Newsletter'
import { useState } from 'react'
import Head from 'next/head'

export default function UiUxDesignCoursePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');

  // Sample course data matching the image
  const courses = Array(6).fill({
    title: "Menciptakan Produk Digital yang Menarik",
    category: "UI/UX Design",
    description: "Pelajari prinsip desain antarmuka dan pengalaman pengguna untuk produk yang lebih baik. Dapatkan inspirasi dan praktis di bidang UI/UX.",
    image: "/browser.svg",
    isFreeRegister: true
  });

  // Filter courses based on search
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    course.description.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Kursus UI/UX Design - Chayon Online Course</title>
      </Head>
      <Navbar />
      
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
              Temukan berbagai wawasan seputar dunia UI/UX Design, mulai dari prinsip desain antarmuka,
              pengalaman pengguna untuk produk yang lebih baik. Dapatkan inspirasi dan praktisi di bidang UI/UX.
            </p>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredCourses.map((course, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-48">
                  <Image
                    src={course.image}
                    alt={course.title}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="inline-block bg-gray-100 text-sm font-medium px-3 py-1 rounded-full">
                      {course.category}
                    </span>
                    {course.isFreeRegister && (
                      <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                        Free Register
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2 leading-tight">{course.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                  <Link 
                    href="/kursus/daftar/ui-ux-design"
                    className="block w-full text-center py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Daftar Sekarang
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
                  className={`px-3 py-1 ${currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-700'} rounded-md`}
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
