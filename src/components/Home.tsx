import Navbar from './Navbar'
import BlogCard from './BlogCard'
import CategoryBar from './CategoryBar'
import Footer from './Footer'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Home = () => {
  // Data Blog Utama
  const mainBlog = {
    title: "Machine Learning: Mengubah Data Menjadi Kecerdasan Buatan yang Bermanfaat",
    description: "Pelajari bagaimana Machine Learning bekerja dalam mengolah data, mengenali pola, dan membuat keputusan cerdas. Dari teori hingga aplikasi nyata, temukan cara teknologi ini membentuk masa depan!",
    category: "Machine Learning",
    date: "12 Apr 2025",
    image: "/nlp.svg",
  };

  // Data Blog Kecil
  const smallBlogs = [
    { title: "Masa Depan Teknologi yang Harus Kamu Kuasai", category: "Machine Learning", date: "10 Apr 2025", image: "/ddos.svg" },
    { title: "Langkah Strategis Menuju Sukses", category: "Jenjang Karir", date: "8 Apr 2025", image: "/wordle.svg" },
    { title: "Rahasia Sukses Melamar Kerja di Era Digital", category: "Melamar Kerja", date: "5 Apr 2025", image: "/notes.svg" },
    { title: "Desain Pengguna dengan Produk Digital", category: "UI/UX Design", date: "2 Apr 2025", image: "/browser.svg" },
    { title: "Menjangkau Audiens dan Meningkatkan Penjualan", category: "Digital Marketing", date: "1 Apr 2025", image: "/keyboard.svg" },
    { title: "Berkarir di Bidang yang Berbeda? Berani untuk Mencoba", category: "Lintas Minat", date: "30 Mar 2025", image: "/hacking.svg" }
  ];

  // State untuk kategori pada masing-masing CategoryBar
  const [selectedCategory1, setSelectedCategory1] = useState<string | null>(null);
  const [selectedCategory2, setSelectedCategory2] = useState<string | null>(null);

  // Filter blogs berdasarkan kategori yang dipilih
  const filteredBlogs1 = selectedCategory1
    ? smallBlogs.filter(blog => blog.category === selectedCategory1)
    : smallBlogs;

  const filteredBlogs2 = selectedCategory2
    ? smallBlogs.filter(blog => blog.category === selectedCategory2)
    : smallBlogs;

  // Pagination untuk Blog Section 1
  const [currentPage1, setCurrentPage1] = useState(1);
  const blogsPerPage = 3;
  const totalPages1 = Math.ceil(filteredBlogs1.length / blogsPerPage);
  const displayedBlogs1 = filteredBlogs1.slice((currentPage1 - 1) * blogsPerPage, currentPage1 * blogsPerPage);

  // Pagination untuk Blog Section 2
  const [currentPage2, setCurrentPage2] = useState(1);
  const totalPages2 = Math.ceil(filteredBlogs2.length / blogsPerPage);
  const displayedBlogs2 = filteredBlogs2.slice((currentPage2 - 1) * blogsPerPage, currentPage2 * blogsPerPage);

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
            <Image src="/sparkle.svg" width={18} height={24} alt="Sparkle " />
          </div>

          <h1 className="text-6xl font-bold text-gray-900 leading-tight">Explore Knowledge & Insights</h1>
          <p className="text-lg text-gray-700 max-w-[898px]">
            Temukan berbagai wawasan seputar dunia teknologi, kursus online, dan perkembangan terbaru. 
            Dapatkan informasi eksklusif, serta kisah inspiratif dari narasumber kami.
          </p>
        </div>

        {/* Category Bar 1 */}
        <CategoryBar onCategorySelect={setSelectedCategory1} />

        {/* Blog Section 1 */}
        <BlogCard mainBlog={mainBlog} smallBlogs={displayedBlogs1} />

        {/* Pagination untuk Blog Section 1 */}
        <div className="flex space-x-4 mt-8">
          <button 
            onClick={() => setCurrentPage1(prev => Math.max(prev - 1, 1))} 
            className="w-10 h-10 flex justify-center items-center border border-gray-300 rounded-md bg-white"
            disabled={currentPage1 === 1}
          >
            ❮
          </button>
          {[...Array(totalPages1)].map((_, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentPage1(index + 1)}
              className={`w-10 h-10 flex justify-center items-center border rounded-md ${currentPage1 === index + 1 ? 'bg-blue-600 text-white' : 'bg-white border-gray-300'}`}
            >
              {index + 1}
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage1(prev => Math.min(prev + 1, totalPages1))} 
            className="w-10 h-10 flex justify-center items-center border border-gray-300 rounded-md bg-white"
            disabled={currentPage1 === totalPages1}
          >
            ❯
          </button>
        </div>

        {/* Category Bar 2 */}
        <CategoryBar onCategorySelect={setSelectedCategory2} />

        {/* Blog Section 2 */}
        <BlogCard smallBlogs={displayedBlogs2} buttonText="Daftar Sekarang" buttonColor="black" textColor="white" />

        {/* Pagination untuk Blog Section 2 */}
        <div className="flex space-x-4 mt-8">
          <button 
            onClick={() => setCurrentPage2(prev => Math.max(prev - 1, 1))} 
            className="w-10 h-10 flex justify-center items-center border border-gray-300 rounded-md bg-white"
            disabled={currentPage2 === 1}
          >
            ❮
          </button>
          {[...Array(totalPages2)].map((_, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentPage2(index + 1)}
              className={`w-10 h-10 flex justify-center items-center border rounded-md ${currentPage2 === index + 1 ? 'bg-blue-600 text-white' : 'bg-white border-gray-300'}`}
            >
              {index + 1}
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage2(prev => Math.min(prev + 1, totalPages2))} 
            className="w-10 h-10 flex justify-center items-center border border-gray-300 rounded-md bg-white"
            disabled={currentPage2 === totalPages2}
          >
            ❯
          </button>
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
      <Footer />
    </>
  );
};

export default Home;