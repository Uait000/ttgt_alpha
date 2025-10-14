export const BASE_URL = 'http://185.13.47.146:50123';
export const POSTS_ENDPOINT = '/content/posts/'; 
export const POST_DETAIL_ENDPOINT = (slug: string) => `/content/posts/${slug}`; 
export const FILES_ENDPOINT = '/files';
export const VACANCIES_ENDPOINT = '/vacancies';
export const TEACHERS_ENDPOINT = '/admin/teachers';
export const PROFESSIONALS_ENDPOINT = '/admin/professionals';
export const CONTESTS_ENDPOINT = '/admin/contests';

export const POST_TAGS = [
  "Новости",
  "Достижения",
  "Образование",
  "Событие"
];

export interface NewsPost {
  id: number;
  slug: string;
  title: string;
  body: string; // Основной текст, который приходит в списке
  image_url?: string;
  image_urls?: string[];
  images?: string[];
  publish_date: number;
  author: string;
  views: number;
  type: number;
  status: number;
  snippet?: string;
  date?: string;
}

// ↓↓↓ ИСПРАВЛЕНИЕ: NewsDetailPost теперь должен расширять NewsPost, но не перезаписывать body.
// Если full content приходит в том же поле 'body', то content не нужен.
// Однако, если API при детальном запросе возвращает полное тело в поле 'content', 
// а 'body' в нем отсутствует, то оставляем его. 
// Но если полное тело возвращается в 'body', то 'content' должен быть необязательным.
export interface NewsDetailPost extends NewsPost {
  content?: string; // Сделаем content необязательным, если он дублирует body
  images?: string[];
}
// ↑↑↑ КОНЕЦ ИСПРАВЛЕНИЯ ↑↑↑

export interface Vacancy {
  id: number;
  title: string;
  department: string;
  salary: string;
  description?: string;
}

// --- ИЗМЕНЕНИЕ ЗДЕСЬ ---
// Заменяем одно поле 'name' на три отдельных поля для имени, фамилии и отчества.
export interface Teacher {
  id: number;
  initials: string;
}
// --- КОНЕЦ ИЗМЕНЕНИЯ ---

export interface Professional {
  date: number;
  id: number;
  slug: string;
  title: string;
  body: string;
  image_urls?: string[];
  publish_date: number;
  author: string;
  category: string;
  views: number;
  status: number;
}

export interface Contest {
  id: number;
  slug: string;
  title: string;
  description: string;
  image_url?: string;
  pdf_files?: ContestFile[];
  subdocuments?: ContestFile[];
  publish_date: number;
  status: number;
}

export interface ContestFile {
  id: number;
  title: string;
  file_url: string;
  file_name: string;
}