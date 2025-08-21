'use client'

import React, { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Newsletter } from '@/components/ui/Newsletter'
import { Article, getArticleBySlug } from '@/lib/api'

export default function ArticlePage(
  props: { params: { id: string }, searchParams?: { [key: string]: string | string[] | undefined } }
) {
  const { params } = props;
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleData = await getArticleBySlug(params.id);
        if (!articleData) throw new Error('Article not found');
        setArticle(articleData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch article');
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticle();
  }, [params.id]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Loading...</span>
        </div>
      </div>
    );
  }

  if (!article) {
    notFound();
  }

  const handleCopyLink = async () => {
    try {
      const url = `https://chayon.com/blog/${params.id}`;
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
            src={article.image_url || '/fallback.jpg'}
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
              <div className="text-gray-700 mb-4 leading-relaxed whitespace-pre-wrap">
                {section.paragraphs}
              </div>
              {section.bulletPoints && (
                <div className="pl-6">
                  {section.bulletPoints.split('\n').map((point, idx) => (
                    <div key={idx} className="flex items-start mb-2">
                      <span className="mr-2">•</span>
                      <span className="text-gray-700">{point.replace('- ', '')}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </article>

        {/* Share Feature */}
        <div className="mt-8 mb-12">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Bagikan artikel ini:</span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://chayon.com/blog/' + params.id)}`}
              target="_blank" rel="noopener noreferrer"
              className="hover:text-blue-700"
              aria-label="Share on Facebook"
            >
              <Image src="/facebook.svg" width={20} height={20} alt="Facebook" />
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(article.title + ' https://chayon.com/blog/' + params.id)}`}
              target="_blank" rel="noopener noreferrer"
              className="hover:text-green-600"
              aria-label="Share on WhatsApp"
            >
              <Image src="/whatsapp.svg" width={20} height={20} alt="WhatsApp" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://chayon.com/blog/' + params.id)}&text=${encodeURIComponent(article.title)}`}
              target="_blank" rel="noopener noreferrer"
              className="hover:text-blue-500"
              aria-label="Share on Twitter"
            >
              <Image src="/twitter.svg" width={20} height={20} alt="Twitter" />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent('https://chayon.com/blog/' + params.id)}&title=${encodeURIComponent(article.title)}`}
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
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}