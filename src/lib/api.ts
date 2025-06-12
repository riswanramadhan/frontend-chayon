export interface Article {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  image: string;
  content: {
    title: string;
    paragraphs: string;
    bulletPoints: string;
  }[];
  related_articles: {
    title: string;
  }[];
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number = 500) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new ApiError(error.message || 'An error occurred', response.status);
  }
  return response.json();
}

export async function getAllArticles(): Promise<Article[]> {
  try {
    const response = await fetch(`${API_URL}/api/artikel`);
    const data = await handleResponse<ApiResponse<Article[]>>(response);
    return data.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error instanceof ApiError ? error : new ApiError('Failed to fetch articles');
  }
}

export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const response = await fetch(`${API_URL}/api/artikel/${id}`);
    if (response.status === 404) return null;
    const data = await handleResponse<ApiResponse<Article>>(response);
    return data.data;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error instanceof ApiError ? error : new ApiError('Failed to fetch article');
  }
}