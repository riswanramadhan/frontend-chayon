'use client'

import React, { Suspense } from 'react'
import { getArticleBySlug, getRelatedArticles } from '@/lib/articles'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Newsletter } from '@/components/ui/Newsletter'
import { useState } from 'react'

type PageParams = {
  params: Promise<{ id: string }> | { id: string };
};

export default function ArticlePage({ params }: PageParams) {
  const resolvedParams = React.use(params as Promise<{ id: string }>);
  const article = getArticleBySlug(resolvedParams.id)
  const relatedArticles = getRelatedArticles(resolvedParams.id)
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);

  if (!article) {
    notFound()
  }

  const handleCopyLink = async () => {
    try {
      const url = `https://chayon.com/blog/${resolvedParams.id}`;
      await navigator.clipboard.writeText(url);
      setShowCopyFeedback(true);
      setTimeout(() => setShowCopyFeedback(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Header */}
        <div className="mb-8">
          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mb-4">
            {article.category}
          </span>
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <p className="text-gray-600 mb-4">{article.date}</p>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-64 mb-8">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-contain"
          />
        </div>

        {/* Article Content */}
        <article className="prose max-w-none">
          {article.content.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              {section.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-gray-700 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
              {section.bulletPoints && (
                <ul className="list-disc pl-6 mb-4">
                  {section.bulletPoints.map((point, bIndex) => (
                    <li key={bIndex} className="text-gray-700 mb-2">
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </article>

        {/* Share Feature */}
        <div className="mt-8 mb-12">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Bagikan artikel ini:</span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://chayon.com/blog/' + resolvedParams.id)}`}
              target="_blank" rel="noopener noreferrer"
              className="hover:text-blue-700"
              aria-label="Share on Facebook"
            >
              <Image src="/facebook.svg" width={20} height={20} alt="Facebook" />
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(article.title + ' https://chayon.com/blog/' + resolvedParams.id)}`}
              target="_blank" rel="noopener noreferrer"
              className="hover:text-green-600"
              aria-label="Share on WhatsApp"
            >
              <Image src="/whatsapp.svg" width={20} height={20} alt="WhatsApp" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://chayon.com/blog/' + resolvedParams.id)}&text=${encodeURIComponent(article.title)}`}
              target="_blank" rel="noopener noreferrer"
              className="hover:text-blue-500"
              aria-label="Share on Twitter"
            >
              <Image src="/twitter.svg" width={20} height={20} alt="Twitter" />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent('https://chayon.com/blog/' + resolvedParams.id)}&title=${encodeURIComponent(article.title)}`}
              target="_blank" rel="noopener noreferrer"
              className="hover:text-blue-800"
              aria-label="Share on LinkedIn"
            >
              <Image src="/linkedin.svg" width={20} height={20} alt="LinkedIn" />
            </a>
            <div className="relative">
              <button
                onClick={handleCopyLink}
                className="hover:text-gray-600 transition-colors"
                aria-label="Copy Link"
              >
                <Image src="/link.svg" width={20} height={20} alt="Copy Link" />
              </button>
              {showCopyFeedback && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Link Copied!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">What to read next</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link 
                  href={`/blog/${related.slug}`} 
                  key={related.slug}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                    <div className="relative w-full h-40 mb-4">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm text-blue-600">{related.category}</span>
                    <h4 className="font-semibold mt-2 group-hover:text-blue-600 transition-colors">
                      {related.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-2">{related.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <Newsletter />
      <Footer />
    </>
  )
}