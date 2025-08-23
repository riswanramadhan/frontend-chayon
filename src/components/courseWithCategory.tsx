'use client'
import { ComponentType, useEffect, useState } from 'react';
import { getAllCourses, Course, ApiError } from '@/lib/api';
import { LoadingArticles } from '@/components/ui/LoadingArticles';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Newsletter } from '@/components/ui/Newsletter';
import { filterArticles, paginateData, getPageCount } from '@/lib/utils';

export interface CourseWithCategoryProps {
  courses: Course[];
  isLoading: boolean;
  error: string | null;
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  paginatedArticles: Course[];
}

export function courseWithCategory(
  WrappedComponent: ComponentType<CourseWithCategoryProps>,
  category: string,
  itemsPerPage: number = 9
) {
  return function CategoryComponent() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
      async function loadCourses() {
        try {
          const data = await getAllCourses();
          const filteredData = data.filter(course => course.course_category === category);
          setCourses(filteredData);
          setError(null);
        } catch (err) {
          const message = err instanceof ApiError ? err.message : 'Failed to load courses';
          setError(message);
        } finally {
          setIsLoading(false);
        }
      }
      loadCourses();
    }, []);

    // Reset to first page when search keyword changes
    useEffect(() => {
      setCurrentPage(1);
    }, [searchKeyword]);

    const filteredArticles = filterArticles(courses, searchKeyword);
    const totalPages = getPageCount(filteredArticles.length, itemsPerPage);
    const paginatedArticles = paginateData(filteredArticles, currentPage, itemsPerPage);

    if (isLoading) {
      return (
        <main className="min-h-screen bg-white">
          <div className="container mx-auto px-4 py-16">
            <LoadingArticles />
          </div>
        </main>
      );
    }

    if (error) {
      return (
        <main className="min-h-screen bg-white">
          <div className="container mx-auto px-4 py-16">
            <ErrorMessage message={error} />
          </div>
        </main>
      );
    }

    return (
      <>
        <WrappedComponent
          courses={courses}
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
      </>
    );
  };
}