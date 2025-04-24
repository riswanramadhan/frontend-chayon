import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="flex justify-between items-center hug-w-[1440px] mx-auto">
      {/* Container untuk batasan maksimal */}
      <div className="container mx-auto px-8 max-w-screen-xl">
        
        {/* Top Section */}
        <div className="flex justify-between items-center w-full mb-10">
          {/* Logo (Rata Kiri) */}
          <div className="flex-1">
          <Link href="/" className="hover:text-gray-900">
            <Image src="/logo.svg" width={340} height={80} alt="Chayon Online Course" />
          </Link>
          </div>
          
          {/* Navigation Links (Semi-Tengah) */}
          <nav className="flex justify-center pl-20 space-x-10 text-gray-600">
            <Link href="/" className="hover:text-gray-900">Chayon Online Course</Link>
            <Link href="/our-story" className="hover:text-gray-900">Our Story</Link>
            <Link href="/blog" className="hover:text-gray-900">Blog</Link>
            <Link href="/careers" className="hover:text-gray-900">Careers</Link>
            <Link href="/contact" className="hover:text-gray-900">Contact Us</Link>
          </nav>
          
          {/* Social Media Icons (Rata Kanan) */}
          <div className="flex-1 flex justify-end space-x-4">
            {/* External links can remain as <a> tags */}
            <a href="#" className="hover:text-gray-900">
              <Image src="/facebook.svg" width={30} height={30} alt="Facebook" />
            </a>
            <a href="#" className="hover:text-gray-900">
              <Image src="/instagram.svg" width={30} height={30} alt="Instagram" />
            </a>
            <a href="#" className="hover:text-gray-900">
              <Image src="/linkedin.svg" width={30} height={30} alt="Linkedin" />
            </a>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="w-full py-8 flex justify-between items-center text-gray-500">
          {/* Pesan (Rata Kiri) */}
          <p className="flex-1">Dibuat dengan ❤️ oleh mahasiswa Informatika Universitas Hasanuddin.</p>
          
          {/* Link (Rata Kanan) */}
          <div className="flex-1 flex justify-end space-x-6">
            <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-900">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-gray-900">Cookies Settings</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;