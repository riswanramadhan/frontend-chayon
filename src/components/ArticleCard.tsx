import Image from 'next/image'
import Link from 'next/link'
import { Article, API_URL } from '@/lib/api'
import { formatDate } from '@/lib/utils'
import { useState } from 'react'

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);

  const handleCopyLink = () => {
    const url = `https://chayon.com/blog/${article.slug}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        setShowCopyFeedback(true);
        setTimeout(() => setShowCopyFeedback(false), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <Image
          src={`${API_URL}/storage/artikel-thumbnails/${article.image.split('/').pop()}`}
          alt={article.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="inline-block bg-gray-100 text-sm font-medium px-3 py-1 rounded-full">
            {article.category}
          </span>
          <span className="text-sm text-gray-500">{formatDate(article.created_at)}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 leading-tight group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{article.description}</p>
        
        {/* Share Feature */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-gray-500">Bagikan:</span>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://chayon.com/blog/' + article.slug)}`}
            target="_blank" rel="noopener noreferrer"
            className="hover:text-blue-700">
            <Image src="/facebook.svg" width={20} height={20} alt="Facebook" />
          </a>
          <a href={`https://wa.me/?text=${encodeURIComponent(article.title + ' https://chayon.com/blog/' + article.slug)}`}
            target="_blank" rel="noopener noreferrer"
            className="hover:text-green-600">
            <Image src="/whatsapp.svg" width={20} height={20} alt="WhatsApp" />
          </a>
          <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://chayon.com/blog/' + article.slug)}&text=${encodeURIComponent(article.title)}`}
            target="_blank" rel="noopener noreferrer"
            className="hover:text-blue-500">
            <Image src="/twitter.svg" width={20} height={20} alt="Twitter" />
          </a>
          <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent('https://chayon.com/blog/' + article.slug)}&title=${encodeURIComponent(article.title)}`}
            target="_blank" rel="noopener noreferrer"
            className="hover:text-blue-800">
            <Image src="/linkedin.svg" width={20} height={20} alt="LinkedIn" />
          </a>
          <div className="relative">
            <button onClick={handleCopyLink}
              className="hover:text-gray-600 transition-colors">
              <Image src="/link.svg" width={20} height={20} alt="Copy Link" />
            </button>
            {showCopyFeedback && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Link Copied
              </div>
            )}
          </div>
        </div>

        <Link 
          href={`/blog/${article.slug}`}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
          Baca Selengkapnya
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}