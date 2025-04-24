import Navbar from './Navbar'
import BlogCard from './BlogCard'
import CategoryBar from './CategoryBar'
import Footer from './Footer'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/router'

const Home = () => {
  // Add router for navigation
  const router = typeof window !== 'undefined' ? { 
    push: (path: string) => { window.location.href = path } 
  } : null;

  // Data Blog Utama with ID
  const mainBlog = {
    id: 'machine-learning-data-intelligence',
    title: "Machine Learning: Mengubah Data Menjadi Kecerdasan Buatan yang Bermanfaat",
    description: "Pelajari bagaimana Machine Learning bekerja dalam mengolah data, mengenali pola, dan membuat keputusan cerdas. Dari teori hingga aplikasi nyata, temukan cara teknologi ini membentuk masa depan!",
    category: "Machine Learning",
    date: "12 Apr 2025",
    image: "/nlp.svg",
  };

  // Data Blog Kecil with unique IDs categorized by type
  const blogsByCategory = {
    'digital-marketing': [
      { id: 'audience-reach', title: "Menjangkau Audiens dan Meningkatkan Penjualan", category: "Digital Marketing", date: "11 Apr 2025", image: "/keyboard.svg", description: "Pelajari strategi pemasaran digital untuk meningkatkan jangkauan pasar dan mengoptimalkan penjualan produk digital." }
    ],
    'machine-learning': [
      { id: 'future-tech', title: "Masa Depan Teknologi yang Harus Kamu Kuasai", category: "Machine Learning", date: "10 Apr 2025", image: "/ddos.svg", description: "Pelajari teknologi terkini yang akan membentuk masa depan dan bagaimana kamu bisa mempersiapkan diri untuk menghadapi perkembangan teknologi yang semakin pesat." }
    ],
    'jenjang-karir': [
      { id: 'success-strategy', title: "Langkah Strategis Menuju Sukses", category: "Jenjang Karir", date: "8 Apr 2025", image: "/wordle.svg", description: "Pelajari strategi menyeluruh untuk membangun karir yang sukses di dunia teknologi dan mengembangkan potensi maksimal." }
    ],
    'melamar-kerja': [
      { id: 'job-application-secrets', title: "Rahasia Sukses Melamar Kerja di Era Digital", category: "Melamar Kerja", date: "5 Apr 2025", image: "/notes.svg", description: "Dapatkan tips memaksimalkan profil digital dan strategi melamar kerja yang berhasil di lingkungan kerja modern." }
    ],
    'ui-ux': [
      { id: 'user-design', title: "Desain Pengguna dengan Produk Digital", category: "UI/UX Design", date: "2 Apr 2025", image: "/browser.svg", description: "Pelajari cara mendesain pengalaman pengguna lebih efektif dan menciptakan produk digital yang bermanfaat bagi pengguna." }
    ],
    'lintas-minat': [
      { id: 'career-change', title: "Berkarir di Bidang yang Berbeda? Berani untuk Mencoba", category: "Lintas Minat", date: "30 Mar 2025", image: "/hacking.svg", description: "Pelajari jalur karier bidang teknologi yang berbeda untuk memperluas peluang jika keinginan untuk beralih profesi muncul." }
    ]
  };

  // Flatten blogs for displaying in sections
  const allBlogs = Object.values(blogsByCategory).flat();
  
  // Categories for the blog CategoryBar
  const blogCategories = [
    { id: 'all', name: 'Show all' },
    { id: 'digital-marketing', name: 'Digital Marketing' },
    { id: 'machine-learning', name: 'Machine Learning' },
    { id: 'ui-ux-design', name: 'UI/UX Design' }, // Updated ID to match the filtering logic
    { id: 'melamar-kerja', name: 'Melamar Kerja' },
    { id: 'lintas-minat', name: 'Lintas Minat' },
    { id: 'jenjang-karir', name: 'Jenjang Karir' }
  ];

  // Categories for learning journey CategoryBar
  const journeyCategories = [
    { id: 'all', name: 'Show all' },
    { id: 'digital-marketing', name: 'Digital Marketing' },
    { id: 'machine-learning', name: 'Machine Learning' },
    { id: 'ui-ux-design', name: 'UI/UX Design' } // Updated ID to match the filtering logic
  ];

  // Learning journey courses
  const learningJourneyCourses = [
    {
      id: 'brand-marketing',
      title: "Bangun Brand dan Tingkatkan Penjualan",
      category: "Digital Marketing",
      description: "Pelajari cara membangun brand digital yang kuat dan meningkatkan strategi pemasaran yang efektif untuk penjualan produk.",
      image: "/keyboard.svg",
      freeRegister: true
    },
    {
      id: 'digital-product',
      title: "Menciptakan Produk Digital yang Menarik",
      category: "UI/UX Design",
      description: "Pelajari prinsip desain dan pengembangan produk yang berpusat pada pengguna serta produk yang lebih baik.",
      image: "/browser.svg",
      freeRegister: true
    },
    {
      id: 'machine-learning-basic',
      title: "Mulai dari Notifikasi Dasar-Dasar Machine Learning",
      category: "Machine Learning",
      description: "Pelajari konsep dasar Machine Learning untuk aplikasi praktis di bidang AI.",
      image: "/nlp.svg",
      freeRegister: true
    }
  ];

  // State for blogs section
  const [selectedBlogCategory, setSelectedBlogCategory] = useState<string>('all');
  const [currentBlogPage, setCurrentBlogPage] = useState(1);
  
  // State for learning journey section
  const [selectedJourneyCategory, setSelectedJourneyCategory] = useState<string>('all');
  const [currentJourneyPage, setCurrentJourneyPage] = useState(1);
  
  // Function to handle blog click
  const handleBlogClick = (blogId: string) => {
    if (router) {
      router.push(`/blog/${blogId}`);
    }
  };

  // Function to filter blogs based on selected category
  const filteredBlogs = selectedBlogCategory === 'all' 
    ? allBlogs 
    : allBlogs.filter(blog => {
        // Create a normalized category ID that matches our category selection IDs
        const blogCategoryId = blog.category.toLowerCase().replace(/[\s/]+/g, '-');
        return blogCategoryId === selectedBlogCategory;
      });

  // Determine the main blog to display based on category selection
  const displayedMainBlog = selectedBlogCategory === 'all' 
    ? mainBlog 
    : (mainBlog.category.toLowerCase().replace(/[\s/]+/g, '-') === selectedBlogCategory 
        ? mainBlog 
        : (filteredBlogs.length > 0 ? filteredBlogs[0] : mainBlog));
      
  // If the main blog is now one of the filtered blogs, remove it from the list to avoid duplication
  const displayedSecondaryBlogs = displayedMainBlog !== mainBlog && filteredBlogs.includes(displayedMainBlog)
    ? filteredBlogs.filter(blog => blog.id !== displayedMainBlog.id)
    : filteredBlogs;

  // Filter learning journey courses
  const filteredJourneyCourses = selectedJourneyCategory === 'all'
    ? learningJourneyCourses
    : learningJourneyCourses.filter(course => {
        // Create a normalized category ID that matches our category selection IDs
        const courseCategoryId = course.category.toLowerCase().replace(/[\s/]+/g, '-');
        return courseCategoryId === selectedJourneyCategory;
      });

  // Function to handle category change for blogs
  const handleBlogCategoryChange = (category: string) => {
    setSelectedBlogCategory(category);
    setCurrentBlogPage(1);
  };

  // Function to handle category change for learning journey
  const handleJourneyCategoryChange = (category: string) => {
    setSelectedJourneyCategory(category);
    setCurrentJourneyPage(1);
  };

  // Handle blog pagination
  const handleBlogPageChange = (page: number) => {
    setCurrentBlogPage(page);
  };

  // Handle journey pagination
  const handleJourneyPageChange = (page: number) => {
    setCurrentJourneyPage(page);
  };

  return (
    <>
      <Navbar />

      {/* Search Bar */}
      <div className="flex flex-col items-center mt-16 space-y-12">
        <div className="flex items-center bg-white shadow-md rounded-full px-6 py-3 w-[554px]">
          <Image src="/search.svg" width={24} height={24} alt="Search Icon" className="mr-3" />
          <input 
            type="text" 
            placeholder="Pencarian" 
            className="outline-none text-gray-500 text-lg font-light w-full" 
          />
        </div>

        {/* Text Section 1 */}
        <div className="flex flex-col items-center text-center max-w-[968px] space-y-6">
          <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full shadow-sm">
            <span className="text-gray-900 font-medium text-sm">Chayon Online Course</span>
            <Image src="/sparkle.svg" width={18} height={24} alt="Sparkle" />
          </div>

          <h1 className="text-6xl font-bold text-gray-900 leading-tight">Explore Knowledge & Insights</h1>
          <p className="text-lg text-gray-700 max-w-[898px]">
            Temukan berbagai wawasan seputar dunia teknologi, kursus online, dan perkembangan terbaru. 
            Dapatkan informasi eksklusif, serta kisah inspiratif dari narasumber kami.
          </p>
        </div>

        {/* Category Bar for Blogs */}
        <CategoryBar 
          categories={blogCategories} 
          selectedCategory={selectedBlogCategory}
          onCategoryChange={handleBlogCategoryChange}
        />

        {/* Blog Cards Section */}
        <div className="w-full max-w-6xl">
          {/* Main Featured Blog Card - Dynamically changes based on category */}
          <div className="mb-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
              <div className="relative h-[300px]">
                <Image
                  src={displayedMainBlog.image}
                  alt={displayedMainBlog.title}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="inline-block bg-gray-100 text-sm font-medium px-3 py-1 rounded-full">{displayedMainBlog.category}</span>
                  <span className="text-sm text-gray-500">{displayedMainBlog.date}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{displayedMainBlog.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{displayedMainBlog.description}</p>
                <button 
                  onClick={() => handleBlogClick(displayedMainBlog.id)}
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Baca Selengkapnya
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Blog Cards Grid - Using filtered blogs that don't include the main blog */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayedSecondaryBlogs.slice(0, 6).map((blog) => (
              <div key={blog.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 h-full cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleBlogClick(blog.id)}>
                <div className="relative h-48">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="inline-block bg-gray-100 text-xs font-medium px-3 py-1 rounded-full">{blog.category}</span>
                    <span className="text-xs text-gray-500">{blog.date}</span>
                  </div>
                  <h3 className="font-bold mb-2 line-clamp-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{blog.description}</p>
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    Baca Selengkapnya
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination for Blogs */}
          <div className="flex justify-center mt-10 mb-16">
            <nav className="flex items-center space-x-2">
              <button 
                onClick={() => handleBlogPageChange(Math.max(1, currentBlogPage - 1))}
                className={`px-3 py-2 ${currentBlogPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'}`}
                disabled={currentBlogPage === 1}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              {[1, 2, 3, 4, 5].map(page => (
                <button
                  key={page}
                  onClick={() => handleBlogPageChange(page)}
                  className={`px-3 py-1 ${currentBlogPage === page ? 'bg-blue-600 text-white rounded-md' : 'text-gray-700 hover:bg-gray-100 rounded-md'}`}
                >
                  {page}
                </button>
              ))}
              
              <button 
                onClick={() => handleBlogPageChange(Math.min(5, currentBlogPage + 1))}
                className={`px-3 py-2 ${currentBlogPage === 5 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'}`}
                disabled={currentBlogPage === 5}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>

        {/* Join Our Learning Journey Section */}
        <div className="w-full py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Join Our Learning Journey</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Mulai perjalanan belajarmu bersama Chayon! Wifi kursus yang teratur, tingkatkan skill, dan dapatkan peluatihan, Certifie! #edukasi dari pakar bidang dan teknologi tahu pembelajaran.
              </p>
            </div>

            {/* Categories for learning journey */}
            <div className="mb-10">
              <CategoryBar 
                categories={journeyCategories} 
                selectedCategory={selectedJourneyCategory}
                onCategoryChange={handleJourneyCategoryChange}
              />
            </div>

            {/* Course Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {filteredJourneyCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                  <div className="relative h-60">
                    <Image
                      src={course.image}
                      alt={course.title}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="inline-block bg-gray-100 text-xs font-medium px-3 py-1 rounded-full">{course.category}</span>
                      {course.freeRegister && (
                        <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                          Free Register
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{course.title}</h3>
                    <p className="text-gray-600 mb-5 line-clamp-3">{course.description}</p>
                    <button 
                      className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      onClick={() => router?.push(`/course/${course.id}`)}
                    >
                      Daftar Sekarang
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination for learning journey */}
            <div className="flex justify-center mt-10">
              <nav className="flex items-center space-x-2">
                <button 
                  onClick={() => handleJourneyPageChange(Math.max(1, currentJourneyPage - 1))}
                  className={`px-3 py-2 ${currentJourneyPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'}`}
                  disabled={currentJourneyPage === 1}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {[1, 2, 3, 4, 5].map(page => (
                  <button
                    key={page}
                    onClick={() => handleJourneyPageChange(page)}
                    className={`px-3 py-1 ${currentJourneyPage === page ? 'bg-blue-600 text-white rounded-md' : 'text-gray-700 hover:bg-gray-100 rounded-md'}`}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  onClick={() => handleJourneyPageChange(Math.min(5, currentJourneyPage + 1))}
                  className={`px-3 py-2 ${currentJourneyPage === 5 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'}`}
                  disabled={currentJourneyPage === 5}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <section className="container mx-auto py-8 px-4 mb-16">
          <div className="bg-white py-8 px-4 rounded-lg border border-gray-200">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-1">Stay up to date!</h3>
                <p className="text-sm text-gray-600">Subscribe to our newsletter to get latest notifications.</p>
              </div>
              <div className="flex w-full md:w-auto">
                <Input placeholder="Enter your email" className="rounded-r-none border-r-0 focus:ring-[#000aff]" />
                <Button className="rounded-l-none bg-[#000aff] hover:bg-[#0008df]">Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;