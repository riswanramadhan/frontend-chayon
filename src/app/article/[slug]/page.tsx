import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import { getArticleBySlug, getRelatedArticles } from "@/lib/articles"
import { notFound } from "next/navigation"

export default function ArticlePage({ params }: { params: { slug: string } }) {
  // Get the article data based on the slug
  const article = getArticleBySlug(params.slug)

  // If article doesn't exist, show 404
  if (!article) {
    notFound()
  }

  // Get related articles
  const relatedArticles = getRelatedArticles(params.slug)

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center mr-8">
              <Image
                src="/placeholder.svg?height=32&width=110"
                alt="Chayon Logo"
                width={110}
                height={32}
                className="mr-1"
              />
            </Link>
            <Navbar />
          </div>
        </div>
      </header>

      <main>
        {/* Article Header */}
        <section className="bg-[#f8f9fa] py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-4">
              <span className="bg-black text-white text-xs px-3 py-1 rounded-full uppercase font-medium mr-4">
                {article.category}
              </span>
              <span className="text-sm text-gray-500">{article.date}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-8 max-w-4xl">{article.title}</h1>
          </div>
        </section>

        {/* Article Content */}
        <div className="container mx-auto px-4">
          {/* Featured Image */}
          <div className="my-8 flex justify-center">
            <div style={{ backgroundColor: article.bgColor }} className="p-8 rounded-lg">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Article Text */}
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg">
              {article.content.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-8">
                  {section.title && <h2 className="text-2xl font-bold mb-4">{section.title}</h2>}

                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex} className="text-gray-700 mb-6">
                      {paragraph}
                    </p>
                  ))}

                  {section.bulletPoints && (
                    <ul className="list-disc pl-6 mb-6">
                      {section.bulletPoints.map((point, pointIndex) => (
                        <li key={pointIndex} className="text-gray-700 mb-2">
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Share */}
            <div className="flex justify-end mt-8">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" /> Share
              </Button>
            </div>
          </div>

          {/* What to read next */}
          <div className="mt-16 mb-16">
            <h2 className="text-2xl font-bold mb-8">What to read next</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle, index) => (
                <div key={index} className="border border-gray-100 rounded-lg overflow-hidden">
                  <div style={{ backgroundColor: relatedArticle.bgColor }} className="p-4">
                    <Image
                      src={relatedArticle.image || "/placeholder.svg"}
                      alt={relatedArticle.title}
                      width={300}
                      height={200}
                      className="w-full"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="bg-black text-white text-xs px-3 py-1 rounded-full uppercase font-medium">
                        {relatedArticle.category}
                      </span>
                      <span className="text-xs text-gray-500">{relatedArticle.date}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{relatedArticle.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{relatedArticle.description}</p>
                    <Link href={`/articles/${relatedArticle.slug}`}>
                      <Button variant="outline" size="sm" className="text-sm">
                        Baca Selengkapnya ›
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <section className="bg-white py-12 border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-2">Stay up to date!</h2>
              <p className="text-gray-600 mb-6">Subscribe to our newsletter to get inbox notifications.</p>
              <div className="flex max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-l-md border border-r-0 border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#000aff]"
                />
                <Button className="rounded-l-none bg-[#000aff] hover:bg-[#0008df]">Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="flex items-center mb-6 md:mb-0">
              <Image src="/placeholder.svg?height=40&width=80" alt="Chayon Logo" width={80} height={40} />
              <span className="ml-2 text-lg font-bold">Chayon</span>
              <span className="ml-2 text-sm font-medium">ONLINE COURSE</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="#" className="text-sm text-gray-600 hover:text-[#000aff]">
                Chayon Online Course
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-[#000aff]">
                Our Story
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-[#000aff]">
                Blog
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-[#000aff]">
                Careers
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-[#000aff]">
                Contact us
              </Link>
            </div>
            <div className="flex space-x-4 mt-6 md:mt-0">
              <Link href="#" className="text-gray-600 hover:text-[#000aff]">
                f
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#000aff]">
                ig
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#000aff]">
                in
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-8">
            <div>©2024 design © Hak Cipta Dilindungi Universitas Hasanuddin.</div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
              <Link href="#">Cookies Settings</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
