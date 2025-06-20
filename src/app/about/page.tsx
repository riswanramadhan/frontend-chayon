'use client';

import Image from "next/image"
import Link from "next/link"
import Footer from '@/components/Footer'
import Navbar from "@/components/Navbar"
import { Newsletter } from '@/components/ui/Newsletter'

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center">
                <h3 className="text-sm uppercase tracking-wider mb-2">TENTANG KAMI</h3>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  We are a team of content writers who share their learnings
                </h1>
              </div>
              <div className="flex items-center">
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section with Image */}
        <section className="relative">
          <div className="container mx-auto px-4">
            <div className="relative">
              <Image 
                src="/overview.png" 
                alt="Team of content writers"
                width={1200}
                height={400}
                className="w-full h-[400px] object-cover"
              />
              
              {/* Stats overlay */}
              <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-center justify-start">
                <div className="bg-yellow-400 py-6 px-8">
                  <div className="text-3xl font-bold">12+</div>
                  <div className="text-sm">Blogs Published</div>
                </div>
                <div className="bg-yellow-400 py-6 px-8 border-l border-yellow-500">
                  <div className="text-3xl font-bold">18K+</div>
                  <div className="text-sm">Views on Pinterest</div>
                </div>
                <div className="bg-yellow-400 py-6 px-8 border-l border-yellow-500">
                  <div className="text-3xl font-bold">30K+</div>
                  <div className="text-sm">Total active Users</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission and Vision */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-sm uppercase tracking-wider mb-2">OUR MISSION</h3>
                <h2 className="text-2xl font-bold mb-4">Creating valuable content for creatives all around the world</h2>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.
                </p>
              </div>
              
              <div>
                <h3 className="text-sm uppercase tracking-wider mb-2">OUR VISION</h3>
                <h2 className="text-2xl font-bold mb-4">A platform that empowers individuals to improve</h2>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our team of creatives */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our team of creatives</h2>
                <p className="text-gray-700 font-semibold mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                </p>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
              <div>
                <Image 
                  src="/hands.png" 
                  alt="Hands together showing teamwork"
                  width={600}
                  height={400}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why we started this Blog */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <Image 
                  src="/group.png" 
                  alt="People working together"
                  width={600}
                  height={350}
                  className="rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Why we started this Blog</h2>
                <p className="text-gray-700 font-semibold mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                </p>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* List of Authors */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">List of Authors</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Floyd Miles", role: "Content Writer @company" },
                { name: "Dianne Russell", role: "Content Writer @company" },
                { name: "Jenny Wilson", role: "Content Writer @company" },
                { name: "Leslie Alexander", role: "Content Writer @company" },
                { name: "Guy Hawkins", role: "Content Writer @company" },
                { name: "Eleanor Pena", role: "Content Writer @company" },
                { name: "Robert Fox", role: "Content Writer @company" },
                { name: "Jacob Jones", role: "Content Writer @company" },
              ].map((author, index) => (
                <div key={index} className="bg-white p-4 text-center">
                  <div className="w-24 h-24 mx-auto mb-4">
                    <Image 
                      src={`/author-${index + 1}.png`} 
                      alt={author.name}
                      width={96}
                      height={96}
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{author.name}</h3>
                  <p className="text-gray-600 text-sm">{author.role}</p>
                  <div className="flex justify-center mt-3 space-x-2">
                    <Link href="#" className="text-gray-500 hover:text-gray-800">
                      <span className="sr-only">Facebook</span>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </Link>
                    <Link href="#" className="text-gray-500 hover:text-gray-800">
                      <span className="sr-only">Twitter</span>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </Link>
                    <Link href="#" className="text-gray-500 hover:text-gray-800">
                      <span className="sr-only">Instagram</span>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </Link>
                    <Link href="#" className="text-gray-500 hover:text-gray-800">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}
