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

// Tanggal saja (DD MMMM YYYY), aman untuk ISO Supabase (dengan mikrodetik) & default UTC
export function formatDate(dateInput?: string | Date | null, useUTC = true): string {
  if (!dateInput) return "";
  const iso = typeof dateInput === "string" ? dateInput.replace(/(\.\d{3})\d+/, "$1") : dateInput.toISOString();
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",  // ganti ke "short" jika mau singkat (Agu, Sep, dst)
    year: "numeric",
    ...(useUTC ? { timeZone: "UTC" } : {}),
  }).format(d);
}


export function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}