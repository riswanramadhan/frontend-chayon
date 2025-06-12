'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { Article, getAllArticles } from '@/lib/api'
import { ArticleCard } from './ArticleCard'
import CategoryBar from './CategoryBar'
import { LoadingArticles } from './ui/LoadingArticles'
import { ErrorMessage } from './ui/ErrorMessage'
import Navbar from './Navbar'
import Footer from './Footer'
import { Newsletter } from './ui/Newsletter'
import Image from 'next/image'
import Link from 'next/link'
import { Pagination } from './ui/Pagination'

const categoryImageMap: { [key: string]: string } = {
  'Digital Marketing': 'keyboard.svg',
  'Machine Learning': 'ddos.svg',
  'UI/UX Design': 'browser.svg',
  'Melamar Kerja': 'notes.svg',
  'Lintas Minat': 'hacking.svg',
  'Jenjang Karir': 'wordle.svg'
};

interface Category {
  id: string;
  name: string;
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBlogCategory, setSelectedBlogCategory] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showCopyFeedback, setShowCopyFeedback] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    async function loadArticles() {
      try {
        const data = await getAllArticles();
        setArticles(data);
      } catch (error) {
        console.error('Error loading articles:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadArticles();
  }, []);

  // Get unique categories from articles and format them for CategoryBar
  const uniqueCategories = Array.from(new Set(articles.map(article => article.category)));
  const formattedCategories: Category[] = [
    { id: 'all', name: 'Show All' },
    ...uniqueCategories.map(category => ({
      id: category.toLowerCase(),
      name: category
    }))
  ];
  
  // Modify article objects to use category-based images
  const articlesWithImages = articles.map(article => ({
    ...article,
    image: categoryImageMap[article.category] || 'default.svg'
  }));

  // Filter articles based on selected category
  const filteredArticles = selectedBlogCategory === 'all' 
    ? articlesWithImages 
    : articlesWithImages.filter((article) => article.category.toLowerCase() === selectedBlogCategory);

  // Pagination calculation
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBlogCategory]);

  // Get the main featured article (first article)
  const mainArticle = articlesWithImages[0];

  // Modified copy link function with popup feedback
  const handleCopyLink = useCallback((slug: string) => {
    const url = `https://chayon.com/blog/${slug}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        setShowCopyFeedback(slug);
        setTimeout(() => setShowCopyFeedback(null), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  }, []);

  if (isLoading) {
    return <LoadingArticles />;
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Latest Articles Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
          <CategoryBar
            categories={formattedCategories}
            selectedCategory={selectedBlogCategory}
            onCategoryChange={setSelectedBlogCategory}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {paginatedArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          <div className="mt-8">
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </section>

        {/* Main Featured Article Card - Dynamically changes based on category */}
        {mainArticle && (
          <div className="mb-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
              <div className="relative h-[300px]">
                <Image
                  src={`/${mainArticle.image}`}
                  alt={mainArticle.title}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="inline-block bg-gray-100 text-sm font-medium px-3 py-1 rounded-full">{mainArticle.category}</span>
                  <span className="text-sm text-gray-500">{mainArticle.date}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{mainArticle.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{mainArticle.description}</p>
                {/* Share Feature */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs text-gray-500">Bagikan:</span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://chayon.com/blog/' + mainArticle.slug)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="hover:text-blue-700"
                    aria-label="Share on Facebook"
                  >
                    <Image src="/facebook.svg" width={20} height={20} alt="Facebook" />
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(mainArticle.title + ' https://chayon.com/blog/' + mainArticle.slug)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="hover:text-green-600"
                    aria-label="Share on WhatsApp"
                  >
                    <Image src="/whatsapp.svg" width={20} height={20} alt="WhatsApp" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://chayon.com/blog/' + mainArticle.slug)}&text=${encodeURIComponent(mainArticle.title)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="hover:text-blue-500"
                    aria-label="Share on Twitter"
                  >
                    <Image src="/twitter.svg" width={20} height={20} alt="Twitter" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent('https://chayon.com/blog/' + mainArticle.slug)}&title=${encodeURIComponent(mainArticle.title)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="hover:text-blue-800"
                    aria-label="Share on LinkedIn"
                  >
                    <Image src="/linkedin.svg" width={20} height={20} alt="LinkedIn" />
                  </a>

                  {/* Copy link with popup */}
                  <div className="relative">
                    <button
                      onClick={() => handleCopyLink(mainArticle.slug)}
                      className="hover:text-gray-600 transition-colors"
                      aria-label="Copy Link"
                    >
                      <Image src="/link.svg" width={20} height={20} alt="Copy Link" />
                    </button>
                    {showCopyFeedback === mainArticle.slug && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        Link Copied
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Link href={`/blog/${mainArticle.slug}`} className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                    Baca Selengkapnya
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

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
                categories={formattedCategories}
                selectedCategory={selectedBlogCategory}
                onCategoryChange={setSelectedBlogCategory}
              />
            </div>

            {/* Course Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {paginatedArticles.map((article) => (
                <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                  <div className="relative h-60">
                    <Image
                      src={`/${article.image}`}
                      alt={article.title}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="inline-block bg-gray-100 text-xs font-medium px-3 py-1 rounded-full">{article.category}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                    <p className="text-gray-600 mb-5 line-clamp-3">{article.description}</p>
                    <Link href={`/courses/${article.category.toLowerCase().replace(/[\s/]+/g, '-')}`} className="block w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center">
                      Daftar Sekarang
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </main>
      <Newsletter />
      <Footer />
    </>
  )
}