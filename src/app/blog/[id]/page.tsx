import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getArticleBySlug, getRelatedArticles } from '@/lib/articles';

// Define types for params
type Params = Promise<{ id: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

// Dynamic metadata for SEO
export async function generateMetadata(props: {
  params: Params
  searchParams?: SearchParams
}) {
  const params = await props.params;
  // Find the blog post from our data source using the slug
  // For a real app, this would be a database or CMS call
  let blogData;

  // Try to get data from our articles library
  const articleData = getArticleBySlug(params.id);
  
  if (articleData) {
    blogData = {
      title: articleData.title,
      description: articleData.description,
      category: articleData.category,
      date: articleData.date,
      image: articleData.image,
    };
  } else {
    // If not in articles, fallback to generic metadata
    blogData = {
      title: `Blog post: ${params.id.replace(/-/g, ' ')}`,
      description: "Blog post description",
    };
  }

  return {
    title: blogData.title,
    description: blogData.description,
  };
}

// Update type definition to match new Next.js App Router requirements
export default async function BlogPost(props: {
  params: Params
  searchParams?: SearchParams
}) {
  const params = await props.params;
  // The 'id' parameter is now actually the slug derived from the title
  const slug = params.id;
  
  // Check if the slug exists in our articles library
  const articleData = getArticleBySlug(slug);
  
  // Fallback data structure for blogs defined in Home.tsx that might not be in articles.ts
  const blogData = articleData || {
    slug,
    title: slug.replace(/-/g, ' '), // Convert slug back to readable title if no article found
    date: "April 2025",
    category: "Technology",
    image: "/placeholder.svg?height=400&width=600",
    bgColor: "#f0f0f0",
    description: "This blog post content is coming soon.",
    content: [
      {
        title: "Content coming soon",
        paragraphs: ["This blog post is under construction."],
      }
    ],
    relatedArticles: []
  };

  // Get related articles if available
  const relatedArticles = articleData ? getRelatedArticles(slug, 3) : [];

  return (
    <>
      <Navbar />
      <main className="pt-16 pb-16">
        {/* Hero Section */}
        <div className="container mx-auto px-4 mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Home
              </Link>
            </div>
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="inline-block bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                {blogData.category}
              </span>
              <span className="text-gray-500 text-sm">{blogData.date}</span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{blogData.title}</h1>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              {blogData.description}
            </p>
          </div>
        </div>
        
        {/* Featured Image */}
        <div className="container mx-auto px-4 mb-12">
          <div className="max-w-4xl mx-auto relative h-[400px] rounded-lg overflow-hidden">
            <Image 
              src={blogData.image} 
              alt={blogData.title}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </div>
        
        {/* Blog Content */}
        <div className="container mx-auto px-4 mb-16">
          <div className="max-w-3xl mx-auto">
            {blogData.content.map((section, index) => (
              <div key={index} className="mb-10">
                {section.title && (
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                )}
                
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-gray-700 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                
                {section.bulletPoints && (
                  <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                    {section.bulletPoints.map((point, bpIndex) => (
                      <li key={bpIndex} className="leading-relaxed">{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-10 text-center">Related Articles</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedArticles.map((article, index) => (
                    <Link href={`/blog/${article.slug}`} key={index}>
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 h-full hover:shadow-md transition-shadow">
                        <div className="relative h-48">
                          <Image 
                            src={article.image} 
                            alt={article.title}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-center mb-2">
                            <span className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">{article.category}</span>
                            <span className="text-xs text-gray-500">{article.date}</span>
                          </div>
                          <h3 className="font-bold mb-2 text-lg">{article.title}</h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.description}</p>
                          <span className="text-blue-600 text-sm font-medium">Read more</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}