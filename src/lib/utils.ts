import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterArticles(articles: any[], searchKeyword: string) {
  const keyword = searchKeyword.toLowerCase();
  return articles.filter((article) =>
    article.title.toLowerCase().includes(keyword) ||
    article.description.toLowerCase().includes(keyword)
  );
}

export function paginateData(items: any[], currentPage: number, itemsPerPage: number = 9) {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return items.slice(start, end);
}

export function getPageCount(totalItems: number, itemsPerPage: number = 9) {
  return Math.ceil(totalItems / itemsPerPage);
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
}
