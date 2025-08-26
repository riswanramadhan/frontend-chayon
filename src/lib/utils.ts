import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type HasText = { title: string; description: string | null }

export function filterArticles<T extends HasText>(
  articles: T[],
  searchKeyword: string,
): T[] {
  const keyword = searchKeyword.toLowerCase()
  return articles.filter(
    (article) =>
      article.title.toLowerCase().includes(keyword) ||
      (article.description?.toLowerCase().includes(keyword) ?? false),
  )
}

export function paginateData<T>(items: T[], currentPage: number, itemsPerPage: number = 9): T[] {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return items.slice(start, end);
}

export function getPageCount(totalItems: number, itemsPerPage: number = 9): number {
  return Math.ceil(totalItems / itemsPerPage);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
}

export function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}