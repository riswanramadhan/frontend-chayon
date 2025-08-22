'use client'
import { ComponentType, useEffect, useState } from 'react';
import { getAllArticles, Article, ApiError } from '@/lib/api';
import { LoadingArticles } from '@/components/ui/LoadingArticles';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Newsletter } from '@/components/ui/Newsletter';
import { filterArticles, paginateData, getPageCount } from '@/lib/utils';

export interface WithCategoryProps {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  paginatedArticles: Article[];
}

export function withCategory(
  WrappedComponent: ComponentType<WithCategoryProps>,
  category: string,
  itemsPerPage: number = 9
) {
  return function CategoryComponent() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
      async function loadArticles() {
        try {
          const data = await getAllArticles();
          const filteredData = data.filter(article => article.category === category);
          setArticles(filteredData);
          setError(null);
        } catch (err) {
          const message = err instanceof ApiError ? err.message : 'Failed to load articles';
          setError(message);
        } finally {
          setIsLoading(false);
        }
      }
      loadArticles();
    }, []);

    // Reset to first page when search keyword changes
    useEffect(() => {
      setCurrentPage(1);
    }, [searchKeyword]);

    const filteredArticles = filterArticles(articles, searchKeyword);
    const totalPages = getPageCount(filteredArticles.length, itemsPerPage);
    const paginatedArticles = paginateData(filteredArticles, currentPage, itemsPerPage);

    if (isLoading) {
      return (
        <>
          <Navbar />
          <main className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-16">
              <LoadingArticles />
            </div>
          </main>
          <Footer />
        </>
      );
    }

    if (error) {
      return (
        <>
          <Navbar />
          <main className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-16">
              <ErrorMessage message={error} />
            </div>
          </main>
          <Footer />
        </>
      );
    }

    return (
      <>
        <Navbar />
        <WrappedComponent
          articles={articles}
          isLoading={isLoading}
          error={error}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          paginatedArticles={paginatedArticles}
        />
        <Newsletter />
        <Footer />
      </>
    );
  };
}