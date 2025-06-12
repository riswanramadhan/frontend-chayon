import Image from 'next/image'
import Link from 'next/link'
import { Article } from '@/lib/api'
import { formatDate } from '@/lib/utils'

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <Image
          src={`/${article.image}`}
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
        <Link 
          href={`/blog/${article.slug}`}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          Baca Selengkapnya
          <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
}