'use client'

import { createClient } from '@supabase/supabase-js'

// ----------------- Types -----------------
export type Article = {
  id: string
  title: string
  slug: string
  category: string | null
  description: string | null
  content?: unknown
  image_url: string | null
  date: string
}

export type Course = {
  id: string
  title: string
  course_slug: string
  course_category: string | null
  description: string | null
  image_url: string | null
  gform_url: string | null
  created_at: string
}

// --------------- Error class ---------------
export class ApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// --------------- Helpers ---------------
type ArticleRow = {
  id: string
  title: string | null
  slug: string | null
  category: string | null
  description: string | null
  content: unknown
  image_url: string | null
  created_at: string | null
}

function mapArticle(row: ArticleRow): Article {
  return {
    id: row.id,
    title: row.title ?? 'Tanpa Judul',
    slug: row.slug ?? '',
    category: row.category ?? null,
    description: row.description ?? null,
    content: row.content ?? null,
    image_url: row.image_url ?? null,
    date: row.created_at ?? new Date().toISOString(),
  }
}

type CourseRow = {
  id: string
  title: string | null
  course_slug: string | null
  course_category: string | null
  description: string | null
  image_url: string | null
  gform_url: string | null
  created_at: string | null
}

function mapCourse(row: CourseRow): Course {
  return {
    id: row.id,
    title: row.title ?? 'Tanpa Judul',
    course_slug: row.course_slug ?? '',
    course_category: row.course_category ?? null,
    description: row.description ?? null,
    image_url: row.image_url ?? null,
    gform_url: row.gform_url ?? null,
    created_at: row.created_at ?? new Date().toISOString(),
  }
}

// --------------- Article APIs ---------------
export async function getAllArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('news')
    .select('id,title,slug,category,description,content,image_url,created_at')
    .order('created_at', { ascending: false })

  if (error) throw new ApiError(error.message)
  return (data ?? []).map(mapArticle)
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const { data, error } = await supabase
    .from('news')
    .select('id,title,slug,category,description,content,image_url,created_at')
    .eq('category', category)
    .order('created_at', { ascending: false })

  if (error) throw new ApiError(error.message)
  return (data ?? []).map(mapArticle)
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('news')
    .select('id,title,slug,category,description,content,image_url,created_at')
    .eq('slug', slug)
    .single()

  if (error) throw new ApiError(error.message)
  return data ? mapArticle(data) : null
}

// --------------- Course APIs ---------------
export async function getAllCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('id,title,course_slug,course_category,description,image_url,gform_url,created_at')
    .order('created_at', { ascending: false })

  if (error) throw new ApiError(error.message)
  return (data ?? []).map(mapCourse)
}

