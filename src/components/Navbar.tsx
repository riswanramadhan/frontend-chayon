"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLLIElement | null }>({
    bidang: null,
    panduan: null,
    karir: null
  });

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleMouseEnter = (menu: string) => {
    setOpenDropdown(menu);
  };

  const handleMouseLeave = (menu: string) => {
    // Only close if we're actually leaving the entire dropdown area
    requestAnimationFrame(() => {
      if (dropdownRefs.current[menu] && !dropdownRefs.current[menu]?.matches(':hover')) {
        setOpenDropdown(null);
      }
    });
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
          
          <li 
            className="relative" 
            ref={el => { dropdownRefs.current.bidang = el; }}
            onMouseEnter={() => handleMouseEnter('bidang')} 
            onMouseLeave={() => handleMouseLeave('bidang')}
          >
            <button onClick={() => toggleDropdown('bidang')} className="flex items-center gap-2">
              Mengenal Bidang <ChevronDown size={16} className={`transition-transform ${openDropdown === 'bidang' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'bidang' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-md rounded-md">
                <Link href="/courses/digital-marketing" className="block px-4 py-2 hover:bg-gray-100">Digital Marketing</Link>
                <Link href="/courses/machine-learning" className="block px-4 py-2 hover:bg-gray-100">Machine Learning</Link>
                <Link href="/courses/ui-ux-design" className="block px-4 py-2 hover:bg-gray-100">UI/UX Design</Link>
              </div>
            )}
          </li>
          
          <li 
            className="relative" 
            ref={el => { dropdownRefs.current.panduan = el; }}
            onMouseEnter={() => handleMouseEnter('panduan')} 
            onMouseLeave={() => handleMouseLeave('panduan')}
          >
            <button onClick={() => toggleDropdown('panduan')} className="flex items-center gap-2">
              Panduan Belajar <ChevronDown size={16} className={`transition-transform ${openDropdown === 'panduan' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'panduan' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-md rounded-md">
                <Link href="/courses/digital-marketing" className="block px-4 py-2 hover:bg-gray-100">Digital Marketing</Link>
                <Link href="/courses/machine-learning" className="block px-4 py-2 hover:bg-gray-100">Machine Learning</Link>
                <Link href="/courses/ui-ux-design" className="block px-4 py-2 hover:bg-gray-100">UI/UX Design</Link>
              </div>
            )}
          </li>
          
          <li 
            className="relative" 
            ref={el => { dropdownRefs.current.karir = el; }}
            onMouseEnter={() => handleMouseEnter('karir')} 
            onMouseLeave={() => handleMouseLeave('karir')}
          >
            <button onClick={() => toggleDropdown('karir')} className="flex items-center gap-2">
              Tips Berkarir <ChevronDown size={16} className={`transition-transform ${openDropdown === 'karir' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'karir' && (
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