import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-50 px-16">
      <div className="flex justify-between items-center hug-w-[1440px] mx-auto">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-800 flex items-center">
          <Image src="/logo.svg" width={167} height={43} alt="Chayon Online Course Logo" />
        </Link>

        {/* Menu */}
        <ul className="flex space-x-14 text-gray-900 font-medium text-[16px]">
          <li>
            <Link href="/" className="font-bold">Home</Link>
          </li>
          
          <li className="relative">
            <button onClick={() => toggleDropdown('mengingat')} className="flex items-center gap-2">
              Mengingat Belajar <ChevronDown size={16} className={`transition-transform ${openDropdown === 'mengingat' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'mengingat' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-md rounded-md">

                <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Digital Marketing</Link>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Machine Learning</Link>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100">UI/UX Design</Link>
              </div>
            )}
          </li>
          
          <li className="relative">
            <button onClick={() => toggleDropdown('penilaian')} className="flex items-center gap-2">
              Penilaian Belajar <ChevronDown size={16} className={`transition-transform ${openDropdown === 'penilaian' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'penilaian' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-md rounded-md">
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Digital Marketing</Link>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Machine Learning</Link>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100">UI/UX Design</Link>
              </div>
            )}
          </li>
          
          <li className="relative">
            <button onClick={() => toggleDropdown('tips')} className="flex items-center gap-2">
              Tips Belajar <ChevronDown size={16} className={`transition-transform ${openDropdown === 'tips' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'tips' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-md rounded-md">
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Melamar Kerja</Link>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Lintas Minat</Link>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Jenjang Karir</Link>
              </div>
            )}
          </li>
          
          <li>
            <Link href="/about">Tentang Kami</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;