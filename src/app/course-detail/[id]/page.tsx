'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Newsletter } from '@/components/ui/Newsletter'
import { Course, getCourseBySlug, getAllCourses, API_URL } from '@/lib/api'

const categoryImageMap: { [key: string]: string } = {
  'Digital Marketing': 'keyboard.svg',
  'Machine Learning': 'nlp.svg',
  'UI/UX Design': 'browser.svg',
};

const categoryBackgroundMap: { [key: string]: string } = {
  'Digital Marketing': 'bg-gray-50',
  'Machine Learning': 'bg-blue-50',
  'UI/UX Design': 'bg-green-50',
};

type PageParams = {
  params: Promise<{ id: string }> | { id: string };
};

export default function DynamicCoursePage({ params }: PageParams) {
  const resolvedParams = React.use(params as Promise<{ id: string }>);
  const [course, setCourse] = useState<Course | null>(null);
  const [otherCourses, setOtherCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseData = await getCourseBySlug(resolvedParams.id);
        if (!courseData) {
          throw new Error('Course not found');
        }
        
        setCourse(courseData);
        
        // Fetch other courses (excluding current one)
        const allCourses = await getAllCourses();
        const others = allCourses
          .filter((c) => c.course_slug !== resolvedParams.id)
          .slice(0, 2)
          .map((course) => ({
            ...course,
            image: categoryImageMap[course.course_category] || 'default.svg'
          }));
        setOtherCourses(others);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch course');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [resolvedParams.id]);

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            <span className="ml-2">Loading...</span>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!course) {
    notFound();
  }

  const courseImage = categoryImageMap[course.course_category] || 'keyboard.svg';
  const backgroundClass = categoryBackgroundMap[course.course_category] || 'bg-gray-50';

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <div className={`${backgroundClass} py-12 px-16`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center mb-4">
              <span className="bg-black text-white text-xs px-3 py-1 rounded-md mr-3">
                {course.course_category}
              </span>
              {/* <span className="text-xs text-gray-600">
                {course.is_free ? 'FREE REGISTER' : 'PAID REGISTER'}
              </span> */}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-12">{course.title}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Image 
                  src={`${API_URL}/storage/artikel-thumbnails/${course.image.split('/').pop()}`}
                  width={400} 
                  height={300} 
                  alt={`${course.course_category} Illustration`}
                  className="mx-auto" 
                />
              </div>
              
              <div className="bg-gray-100 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Tentang {course.title}
                </h2>
                
                <p className="text-gray-700 mb-6">
                  {course.description || 
                   `Pelajari ${course.course_category.toLowerCase()} dengan materi lengkap dan praktis untuk meningkatkan kemampuan Anda.`
                  }
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <div className="w-6 h-6 flex items-center justify-center rounded-md mr-2">
                      <Image src="/book.svg" width={16} height={16} alt="Course" />
                    </div>
                    {/* <span className="text-sm">{course.total_modules || 4} Course</span> */}
                    <span className="text-sm">{course.num_course || '-'} Course</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-6 h-6 flex items-center justify-center rounded-md mr-2">
                      <Image src="/timer.svg" width={16} height={16} alt="Duration" />
                    </div>
                    <span className="text-sm">{course.duration_hours || '-'}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-6 h-6 flex items-center justify-center rounded-md mr-2">
                      <Image src="/video.svg" width={16} height={16} alt="Video" />
                    </div>
                    <span className="text-sm">{course.num_video || '-'} Video</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-6 h-6 flex items-center justify-center rounded-md mr-2">
                      <Image src="/file.svg" width={16} height={16} alt="Quiz" />
                    </div>
                    <span className="text-sm">{course.num_quiz || '-'} Kuis</span>
                  </div>
                </div>
                
                <Link 
                  href={course.cta_link || "#"} 
                  className="block w-full bg-black text-white text-center py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
                >
                  Daftar Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Content Section */}
        {/* {course.content && course.content.length > 0 && (
          <div className="py-16 px-16">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Materi Pembelajaran</h2>
              
              <div className="space-y-8">
                {course.content.map((section, index) => (
                  <div key={index} className="bg-white p-8 rounded-lg shadow-sm border">
                    <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
                    <div className="text-gray-700 mb-4 leading-relaxed whitespace-pre-wrap">
                      {section.paragraphs}
                    </div>
                    {section.bulletPoints && (
                      <div className="pl-6">
                        {section.bulletPoints.split('\n').map((point, idx) => (
                          <div key={idx} className="flex items-start mb-2">
                            <span className="mr-2 text-black">•</span>
                            <span className="text-gray-700">{point.replace('- ', '')}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )} */}
        
        {/* Other Courses Section */}
        {otherCourses.length > 0 && (
          <div className="py-16 px-16">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Other Courses</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherCourses.map((otherCourse, index) => {
                  const otherCourseImage = categoryImageMap[otherCourse.course_category] || 'keyboard.svg';
                  const otherBackgroundClass = categoryBackgroundMap[otherCourse.course_category] || 'bg-gray-50';
                  
                  return (
                    <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col h-full">
                      <div className={`p-6 ${otherBackgroundClass}`}>
                        <Image 
                          src={`/${otherCourseImage}`}
                          width={300} 
                          height={250} 
                          alt={otherCourse.course_category}
                          className="mx-auto" 
                        />
                      </div>
                      
                      <div className="p-6 flex flex-col flex-grow">
                        <div>
                          <div className="flex items-center mb-2">
                            <span className="bg-black text-white text-xs px-2 py-1 rounded-md mr-2">
                              {otherCourse.course_category}
                            </span>
                            {/* <span className="text-xs text-gray-600">
                              {otherCourse.is_free ? 'Free Register' : 'Paid Register'}
                            </span> */}
                          </div>
                          
                          <h3 className="text-xl font-bold mb-2">{otherCourse.title}</h3>
                          <p className="text-sm text-gray-600 mb-4">
                            {otherCourse.description || 
                             `Pelajari ${otherCourse.course_category.toLowerCase()} dengan materi yang komprehensif dan praktis.`
                            }
                          </p>
                        </div>
                        
                        <div className="mt-auto pt-4">
                          <Link 
                            href={`/courses/${otherCourse.course_slug}`}
                            className="block w-full bg-black text-white text-center py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
                          >
                            Daftar Sekarang
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}