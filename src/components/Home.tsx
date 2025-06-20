'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState, useCallback, useMemo } from 'react'

// Components
import Navbar from './Navbar'
import Footer from './Footer'
import CategoryBar from './CategoryBar'
import { ArticleCard } from './ArticleCard'
import { Newsletter } from './ui/Newsletter'
import { Pagination } from './ui/Pagination'
import { LoadingArticles } from './ui/LoadingArticles'

// API & Types
import { Article, getAllArticles, Course, getAllCourses, API_URL } from '@/lib/api'

// Types
interface Category {
  id: string;
  name: string;
}

interface HomeState {
  articles: Article[];
  courses: Course[];
  isLoading: boolean;
  currentArticlePage: number;
  currentCoursePage: number;
  selectedBlogCategory: string;
  selectedCourseBlogCategory: string;
  searchKeyword: string;
  showCopyFeedback: string | null;
}

// Constants
const ITEMS_PER_PAGE = 6;
const ITEMS_PER_PAGE_COURSE = 3;
const COPY_FEEDBACK_DURATION = 2000;

// Custom hooks
const useDataLoader = () => {
  const [state, setState] = useState<Pick<HomeState, 'articles' | 'courses' | 'isLoading'>>({
    articles: [],
    courses: [],
    isLoading: true,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [articlesData, coursesData] = await Promise.all([
          getAllArticles(),
          getAllCourses()
        ]);
        
        setState({
          articles: articlesData,
          courses: coursesData,
          isLoading: false,
        });
      } catch (error) {
        console.error('Error loading data:', error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadData();
  }, []);

  return state;
};

const useCopyToClipboard = () => {
  const [showFeedback, setShowFeedback] = useState<string | null>(null);

  const copyLink = useCallback((slug: string) => {
    const url = `https://chayon.com/blog/${slug}`;
    
    navigator.clipboard.writeText(url)
      .then(() => {
        setShowFeedback(slug);
        setTimeout(() => setShowFeedback(null), COPY_FEEDBACK_DURATION);
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  }, []);

  return { showFeedback, copyLink };
};

// Utility functions
const formatCategories = (items: string[], type: 'articles' | 'courses' = 'articles'): Category[] => [
  { id: 'all', name: 'Show All' },
  ...items.map(item => ({
    id: item.toLowerCase(),
    name: item
  }))
];

const filterByCategory = <T extends { category?: string; course_category?: string }>(
  items: T[],
  selectedCategory: string,
  categoryField: keyof T
): T[] => {
  if (selectedCategory === 'all') return items;
  
  return items.filter(item => {
    const category = item[categoryField] as string;
    return category?.toLowerCase() === selectedCategory;
  });
};

// Social share configuration
const socialShareConfig = [
  {
    name: 'Facebook',
    icon: '/facebook.svg',
    getUrl: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    hoverClass: 'hover:text-blue-700'
  },
  {
    name: 'WhatsApp',
    icon: '/whatsapp.svg',
    getUrl: (url: string, title: string) => `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
    hoverClass: 'hover:text-green-600'
  },
  {
    name: 'Twitter',
    icon: '/twitter.svg',
    getUrl: (url: string, title: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    hoverClass: 'hover:text-blue-500'
  },
  {
    name: 'LinkedIn',
    icon: '/linkedin.svg',
    getUrl: (url: string, title: string) => `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    hoverClass: 'hover:text-blue-800'
  }
];

// Components
const SearchSection: React.FC<{
  searchKeyword: string;
  onSearchChange: (value: string) => void;
}> = ({ searchKeyword, onSearchChange }) => (
  <div className="flex flex-col items-center mt-16 space-y-12">
    <div className="flex items-center bg-white rounded-full px-6 py-3 w-[554px]">
      <Image src="/search.svg" width={24} height={24} alt="Search Icon" className="mr-3" />
      <input 
        type="text" 
        placeholder="Pencarian" 
        className="outline-none text-gray-500 text-lg font-light w-full"
        value={searchKeyword}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  </div>
);

const HeroSection: React.FC = () => (
  <div className="w-full bg-gradient-to-b from-white-50 to-white py-16">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-8">
        <p className="text-sm font-medium text-black-500 mb-2 block">
          Chayon Online Course
          <Image src="/sparkle.svg" width={24} height={24} alt="Sparkle Icon" className="inline-block ml-2" />
        </p>
        <h1 className="text-6xl font-bold text-gray-900 leading-tight mb-4">
          Explore Knowledge & Insights
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Temukan berbagai wawasan seputar dunia teknologi, kursus online, dan perkembangan terbaru.
          Dapatkan informasi eksklusif, serta kisah inspiratif dari narasumber kami.
        </p>
      </div>
    </div>
  </div>
);

const SocialShareButtons: React.FC<{
  article: Article;
  onCopyLink: (slug: string) => void;
  showCopyFeedback: string | null;
}> = ({ article, onCopyLink, showCopyFeedback }) => {
  const articleUrl = `https://chayon.com/blog/${article.slug}`;

  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-xs text-gray-500">Bagikan:</span>
      
      {socialShareConfig.map((social) => (
        <a
          key={social.name}
          href={social.getUrl(articleUrl, article.title)}
          target="_blank"
          rel="noopener noreferrer"
          className={social.hoverClass}
        >
          <Image src={social.icon} width={20} height={20} alt={social.name} />
        </a>
      ))}
      
      <div className="relative">
        <button
          onClick={() => onCopyLink(article.slug)}
          className="hover:text-gray-600 transition-colors"
        >
          <Image src="/link.svg" width={20} height={20} alt="Copy Link" />
        </button>
        {showCopyFeedback === article.slug && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Link Copied
          </div>
        )}
      </div>
    </div>
  );
};

const FeaturedArticleCard: React.FC<{
  article: Article;
  onCopyLink: (slug: string) => void;
  showCopyFeedback: string | null;
}> = ({ article, onCopyLink, showCopyFeedback }) => (
  <div className="mb-8 mt-8">
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-[400px]">
          <Image
            src={`${API_URL}/storage/artikel-thumbnails/${article.image.split('/').pop()}`}
            alt={article.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="inline-block bg-gray-100 text-sm font-medium px-3 py-1 rounded-full">
                {article.category}
              </span>
              <span className="text-sm text-gray-500">{article.date}</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">{article.title}</h3>
            <p className="text-gray-600 mb-6 line-clamp-3">{article.description}</p>
          </div>
          
          <div>
            <SocialShareButtons 
              article={article}
              onCopyLink={onCopyLink}
              showCopyFeedback={showCopyFeedback}
            />
            <Link 
              href={`/blog/${article.slug}`} 
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Baca Selengkapnya
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
    <div className="relative h-[200px]">
      <Image
        src={`${API_URL}/storage/artikel-thumbnails/${course.image.split('/').pop()}`}
        alt={course.title}
        layout="fill"
        objectFit="cover"
      />
    </div>
    <div className="p-6">
      <div className="flex justify-between items-center mb-2">
        <span className="inline-block bg-gray-100 text-xs font-medium px-3 py-1 rounded-full">
          {course.course_category}
        </span>
      </div>
      <h3 className="text-xl font-bold mb-3">{course.title}</h3>
      <p className="text-gray-600 mb-5 line-clamp-3">{course.description}</p>
      <Link href={`/kursus/${course.course_category.toLowerCase().replace(/[\s/]+/g, '-')}`} 
            className="block w-full bg-black text-white text-center py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
        Lihat Kategori
      </Link>
    </div>
  </div>
);

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="text-center py-8">
    <p className="text-gray-500">{message}</p>
  </div>
);

// Main Component
export default function Home() {
  const { articles, courses, isLoading } = useDataLoader();
  const { showFeedback: showCopyFeedback, copyLink: handleCopyLink } = useCopyToClipboard();
  
  const [currentArticlePage, setCurrentArticlePage] = useState(1);
  const [currentCoursePage, setCurrentCoursePage] = useState(1);
  const [selectedBlogCategory, setSelectedBlogCategory] = useState('all');
  const [selectedCourseBlogCategory, setSelectedCourseBlogCategory] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');

  // Memoized calculations
  const { 
    formattedCategories,
    courseFormattedCategories,
    filteredArticles,
    filteredCourses 
  } = useMemo(() => {
    const uniqueCategories = Array.from(new Set(articles.map(article => article.category)));
    const uniqueCourseCategories = Array.from(new Set(courses.map(course => course.course_category)));
    
    return {
      formattedCategories: formatCategories(uniqueCategories),
      courseFormattedCategories: formatCategories(uniqueCourseCategories),
      filteredArticles: filterByCategory(articles, selectedBlogCategory, 'category'),
      filteredCourses: filterByCategory(courses, selectedCourseBlogCategory, 'course_category')
    };
  }, [articles, courses, selectedBlogCategory, selectedCourseBlogCategory]);

  const {
    mainArticle,
    paginatedArticles,
    paginatedCourses,
    totalArticlePages,
    totalCoursePages
  } = useMemo(() => {
    const mainArticle = filteredArticles[0];
    const gridArticles = filteredArticles.slice(1);
    
    // Articles pagination
    const totalArticlePages = Math.ceil(gridArticles.length / ITEMS_PER_PAGE);
    const articleStartIndex = (currentArticlePage - 1) * ITEMS_PER_PAGE;
    const paginatedArticles = gridArticles.slice(articleStartIndex, articleStartIndex + ITEMS_PER_PAGE);

    // Courses pagination
    const totalCoursePages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE_COURSE);
    const courseStartIndex = (currentCoursePage - 1) * ITEMS_PER_PAGE_COURSE;
    const paginatedCourses = filteredCourses.slice(courseStartIndex, courseStartIndex + ITEMS_PER_PAGE_COURSE);

    return {
      mainArticle,
      paginatedArticles,
      paginatedCourses,
      totalArticlePages,
      totalCoursePages
    };
  }, [filteredArticles, filteredCourses, currentArticlePage, currentCoursePage]);

  // Reset pagination when category changes
  useEffect(() => {
    setCurrentArticlePage(1);
  }, [selectedBlogCategory]);

  useEffect(() => {
    setCurrentCoursePage(1);
  }, [selectedCourseBlogCategory]);

  if (isLoading) {
    return <LoadingArticles />;
  }

  return (
    <>
      <Navbar />
      
      <SearchSection 
        searchKeyword={searchKeyword}
        onSearchChange={setSearchKeyword}
      />
      
      <HeroSection />
      
      <main className="container mx-auto px-4 py-0">
        {/* Latest Articles Section */}
        <section className="mb-16">
          <CategoryBar
            categories={formattedCategories}
            selectedCategory={selectedBlogCategory}
            onCategoryChange={setSelectedBlogCategory}
          />
          
          {/* Main Featured Article Card */}
          {mainArticle && (
            <FeaturedArticleCard 
              article={mainArticle}
              onCopyLink={handleCopyLink}
              showCopyFeedback={showCopyFeedback}
            />
          )}

          {/* Article Grid */}
          {paginatedArticles.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
              <div className="mt-8">
                <Pagination 
                  currentPage={currentArticlePage}
                  totalPages={totalArticlePages}
                  onPageChange={setCurrentArticlePage}
                />
              </div>
            </>
          )}

          {/* Empty States */}
          {paginatedArticles.length === 0 && filteredArticles.length === 1 && (
            <EmptyState message="Hanya ada satu artikel untuk kategori ini." />
          )}

          {filteredArticles.length === 0 && (
            <EmptyState message="Tidak ada artikel untuk kategori ini." />
          )}
        </section>

        {/* Learning Journey Section */}
        <div className="w-full py-16 bg-gray-50 -mx-4 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-6xl font-bold text-gray-900 leading-tight mb-4">
                Join Our Learning Journey
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Mulai perjalanan belajarmu bersama Chayon! Pilih kursus yang sesuai, tingkatkan skill, 
                dan wujudkan potensimu. Daftar sekarang dan jadilah bagian dari komunitas pembelajar!
              </p>
            </div>

            <div className="mb-8">
              <CategoryBar 
                categories={courseFormattedCategories}
                selectedCategory={selectedCourseBlogCategory}
                onCategoryChange={setSelectedCourseBlogCategory}
              />
            </div>

            {/* Course Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedCourses.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
            </div>
            
            <div className="mt-8">
              <Pagination 
                currentPage={currentCoursePage}
                totalPages={totalCoursePages}
                onPageChange={setCurrentCoursePage}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Newsletter />
      <Footer />
    </>
  );
}