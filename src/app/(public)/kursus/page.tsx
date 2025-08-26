"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Course = {
  id: string
  title: string
  description: string | null
  gform_url: string | null
}

export default function KursusPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await supabase.from('courses').select('*')
      setCourses(data || [])
      setLoading(false)
    }
    fetchCourses()
  }, [supabase])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Kursus</h1>
      {loading ? (
        <p className="text-gray-500">Memuat kursus...</p>
      ) : courses.length > 0 ? (
        <div className="grid gap-4">
          {courses.map((course) => (
            <div key={course.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="text-sm text-gray-600">{course.description}</p>
              {course.gform_url && (
                <a
                  href={course.gform_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Daftar Sekarang
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Tidak ada kursus yang ditemukan.</p>
      )}
    </div>
  )
}