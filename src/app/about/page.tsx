'use client';

import Image from "next/image"
import Link from "next/link"
import Footer from '@/components/Footer'
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="bg-[#f8f9fa] py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Tentang Kami</h1>
            <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
              Chayon adalah platform pembelajaran online yang didedikasikan untuk membantu individu dan organisasi
              mengembangkan keterampilan digital yang relevan dengan kebutuhan industri saat ini.
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Misi Kami</h2>
                <p className="text-gray-600 mb-6">
                  Misi kami adalah menyediakan pendidikan berkualitas tinggi yang dapat diakses oleh semua orang,
                  membantu mereka mengembangkan keterampilan yang dibutuhkan untuk sukses di era digital.
                </p>
                <p className="text-gray-600">
                  Kami percaya bahwa pendidikan adalah kunci untuk membuka potensi setiap individu dan mendorong
                  pertumbuhan ekonomi yang berkelanjutan. Dengan menyediakan kursus yang relevan dan terkini, kami
                  membantu menjembatani kesenjangan keterampilan di industri teknologi.
                </p>
              </div>
              <div className="bg-[#f5f8fb] p-8 rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Our Mission"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-[#f8f9fa]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Perjalanan Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-[#000aff] font-bold text-xl mb-2">2018</div>
                <h3 className="text-lg font-semibold mb-4">Awal Mula</h3>
                <p className="text-gray-600">
                  Chayon didirikan dengan visi untuk membuat pendidikan teknologi lebih mudah diakses oleh semua orang.
                  Kami memulai dengan beberapa kursus dasar tentang keterampilan digital.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-[#000aff] font-bold text-xl mb-2">2020</div>
                <h3 className="text-lg font-semibold mb-4">Pertumbuhan</h3>
                <p className="text-gray-600">
                  Kami memperluas penawaran kursus kami dan bermitra dengan para ahli industri untuk mengembangkan
                  kurikulum yang relevan dengan kebutuhan pasar kerja saat ini.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-[#000aff] font-bold text-xl mb-2">2023</div>
                <h3 className="text-lg font-semibold mb-4">Saat Ini</h3>
                <p className="text-gray-600">
                  Saat ini, Chayon telah membantu ribuan pelajar mengembangkan keterampilan baru dan memajukan karir
                  mereka di bidang teknologi dan digital.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Tim Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  name: "Ahmad Rizki",
                  position: "Founder & CEO",
                  bio: "Berpengalaman lebih dari 10 tahun di industri teknologi dan pendidikan.",
                },
                {
                  name: "Siti Nurhaliza",
                  position: "Chief Learning Officer",
                  bio: "Ahli dalam pengembangan kurikulum dan strategi pembelajaran online.",
                },
                {
                  name: "Budi Santoso",
                  position: "Head of Technology",
                  bio: "Spesialis dalam pengembangan platform pembelajaran yang interaktif dan user-friendly.",
                },
                {
                  name: "Dewi Lestari",
                  position: "Content Director",
                  bio: "Berpengalaman dalam menciptakan konten pembelajaran yang menarik dan efektif.",
                },
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="bg-[#f5f8fb] rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt={member.name}
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <div className="text-[#000aff] text-sm mb-2">{member.position}</div>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-[#f8f9fa]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Nilai-Nilai Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Aksesibilitas",
                  description:
                    "Kami berkomitmen untuk membuat pendidikan berkualitas tinggi dapat diakses oleh semua orang, terlepas dari latar belakang atau lokasi mereka.",
                },
                {
                  title: "Kualitas",
                  description:
                    "Kami memprioritaskan kualitas dalam semua aspek platform kami, dari konten pembelajaran hingga pengalaman pengguna.",
                },
                {
                  title: "Inovasi",
                  description:
                    "Kami terus berinovasi untuk meningkatkan cara orang belajar dan mengembangkan keterampilan baru di era digital.",
                },
              ].map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        </main>

        {/* Newsletter */}
        <section className="container mx-auto px-4 mb-16">
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
