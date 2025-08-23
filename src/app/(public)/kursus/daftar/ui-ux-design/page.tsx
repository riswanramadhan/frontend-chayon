import Image from 'next/image';
import Link from 'next/link';
import { Newsletter } from '@/components/ui/Newsletter'

export default function UiUxDesign() {
  return (
    <>
      <main>
        {/* Hero Section */}
        <div className="bg-gray-50 py-12 px-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center mb-4">
              <span className="bg-black text-white text-xs px-3 py-1 rounded-md mr-3">UI/UX Design</span>
              <span className="text-xs text-gray-600">PAID REGISTER</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-12">Menciptakan Produk Digital yang Menarik</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-green-50 p-6 rounded-lg shadow-md">
                <Image 
                  src="/browser.svg" 
                  width={400} 
                  height={300} 
                  alt="UI/UX Design Illustration" 
                  className="mx-auto" 
                />
              </div>
              
              <div className="bg-gray-100 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Menciptakan Produk Digital yang Menarik</h2>
                
                <p className="text-gray-700 mb-6">
                  Pelajari prinsip desain antarmuka dan pengalaman pengguna untuk produk yang lebih baik.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <div className="w-6 h-6 lex items-center justify-center rounded-md mr-2">
                      <Image src="/book.svg" width={16} height={16} alt="Course" />
                    </div>
                    <span className="text-sm">4 Course</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-6 h-6 flex items-center justify-center rounded-md mr-2">
                      <Image src="/timer.svg" width={16} height={16} alt="Duration" />
                    </div>
                    <span className="text-sm">15h 11m</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-6 h-6 flex items-center justify-center rounded-md mr-2">
                      <Image src="/video.svg" width={16} height={16} alt="Video" />
                    </div>
                    <span className="text-sm">60 Video</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-6 h-6 flex items-center justify-center rounded-md mr-2">
                      <Image src="/file.svg" width={16} height={16} alt="Quiz" />
                    </div>
                    <span className="text-sm">25 Kuis</span>
                  </div>
                </div>
                
                <Link href="#" className="block w-full bg-black text-white text-center py-3 rounded-md font-medium">
                  Daftar Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Other Courses Section */}
        <div className="py-16 px-16">
          <h2 className="text-3xl font-bold mb-8">Other Courses</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Digital Marketing Course Card */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col h-full">
              <div className="p-6 bg-purple-50">
                <Image 
                  src="/keyboard.svg" 
                  width={300} 
                  height={250} 
                  alt="Digital Marketing" 
                  className="mx-auto" 
                />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="bg-black text-white text-xs px-2 py-1 rounded-md mr-2">Digital Marketing</span>
                    <span className="text-xs text-gray-600">Free Register</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">Bangun Brand dan Tingkatkan Penjualan</h3>
                  <p className="text-sm text-gray-600 mb-4">Pelajari SEO, strategi media sosial, dan iklan digital untuk pemasaran yang efektif serta tips menjangkau audiens yang tepat.</p>
                </div>
                
                <div className="mt-auto pt-4">
                  <Link href="/courses/digital-marketing" className="block w-full bg-black text-white text-center py-3 rounded-md font-medium">
                    Daftar Sekarang
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Machine Learning Course Card */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col h-full">
              <div className="p-6 bg-blue-50">
                <Image 
                  src="/nlp.svg" 
                  width={300} 
                  height={250} 
                  alt="Machine Learning" 
                  className="mx-auto" 
                />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="bg-black text-white text-xs px-2 py-1 rounded-md mr-2">Machine Learning</span>
                    <span className="text-xs text-gray-600">Free Register</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">Mulai dari Nol! Kuasai Dasar-Dasar Machine Learning</h3>
                  <p className="text-sm text-gray-600 mb-4">Pelajari konsep, algoritma, dan implementasi Machine Learning untuk karir di bidang AI.</p>
                </div>
                
                <div className="mt-auto pt-4">
                  <Link href="/courses/machine-learning" className="block w-full bg-black text-white text-center py-3 rounded-md font-medium">
                    Daftar Sekarang
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Newsletter />
      
    </>
  );
}