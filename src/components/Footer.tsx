import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="container mx-auto max-w-screen-xl px-8 py-10">
        {/* Baris utama: kiri = logo, tengah = pesan, kanan = sosmed */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
          {/* Kiri: Logo */}
          <div className="justify-self-start">
            <Link href="/" className="hover:opacity-90 inline-block">
              <Image src="/logo.svg" width={340} height={80} alt="Chayon Online Course" />
            </Link>
          </div>

          {/* Tengah: Pesan */}
          <p className="text-center text-gray-600 text-sm md:text-base">
            Dibuat dengan ❤️ oleh Riswan Ramadhan (Teknik Informatika Unhas).</p>

          {/* Kanan: Sosial */}
          <div className="flex justify-center md:justify-end items-center gap-4">
            <a
              href="https://www.instagram.com/chayon.id?igsh=bGJzZDRxbXh1aXEz"
              className="hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Image src="/instagram.svg" width={30} height={30} alt="Instagram" />
            </a>
            <a
              href="https://www.linkedin.com/company/chayon-online-course"
              className="hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Image src="/linkedin.svg" width={30} height={30} alt="LinkedIn" />
            </a>
            <a
              href="https://www.youtube.com/@chayon_youtube"
              className="hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <Image src="/youtube.svg" width={30} height={30} alt="YouTube" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
