import { getArticleBySlug, getRelatedArticles } from '@/lib/articles'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { Newsletter } from '@/components/ui/Newsletter'

export default function ArticlePage({ params }: { params: { id: string } }) {
  const article = getArticleBySlug(params.id)
  const relatedArticles = getRelatedArticles(params.id)

  if (!article) {
    notFound()
  }

  return (
    <>
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