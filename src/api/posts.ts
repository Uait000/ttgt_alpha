import { BASE_URL } from './config';
import type { NewsPost, NewsDetailPost } from './config';
import { filesApi } from './files';

// ... (ConflictError, getAuthHeaders, CreatePostPayload остаются без изменений)
export class ConflictError extends Error {
  constructor(message = 'Ресурс уже существует.') {
    super(message);
    this.name = 'ConflictError';
  }
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'X-Authorization': token } : {}),
  };
};

export interface CreatePostPayload {
  title: string;
  content: string;
  author: string;
  type: number;
  image_urls?: string[];
  date: string;
  category: number;
}


// ↓↓↓ УДАЛЕНА ФУНКЦИЯ generateSlug, ТАК КАК SLUG НЕ ТРЕБУЕТСЯ В POST-ЗАПРОСЕ ↓↓↓


export const postsApi = {
  // ... (getAll и getBySlug остаются без изменений)
  getAll: async (params?: { limit?: number; offset?: number }): Promise<NewsPost[]> => {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    queryParams.append('category', '0');
    const url = `${BASE_URL}/content/posts/?${queryParams.toString()}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  },

  getBySlug: async (slug: string): Promise<NewsDetailPost> => {
    const response = await fetch(`${BASE_URL}/content/posts/${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    return response.json();
  },

  create: async (payload: CreatePostPayload, imageFiles?: File[]): Promise<NewsPost> => {
    let imageUrls: string[] = [];
    if (imageFiles && imageFiles.length > 0) {
      const uploadPromises = imageFiles.map(file => filesApi.upload(file));
      const uploadResults = await Promise.all(uploadPromises);
      imageUrls = uploadResults
        .map(result => result?.url)
        .filter((url): url is string => !!url);
    }
    
    // ↓↓↓ ИСПРАВЛЕНИЕ: Гарантируем, что category и type — это числа. ↓↓↓
    const category = Number(payload.category);
    const type = Number(payload.type);

    if (isNaN(category) || isNaN(type)) {
        throw new Error('Поля "Категория" и "Тип поста" должны быть выбраны.');
    }
    
    const finalPayload = {
      title: payload.title,
      body: payload.content,
      publish_date: Math.floor(new Date(payload.date).getTime() / 1000),
      author: payload.author,
      category: category, // Используем проверенное числовое значение
      type: type,         // Используем проверенное числовое значение
      status: 1, 
      images: imageUrls,
    };
    // ↑↑↑ КОНЕЦ ИСПРАВЛЕНИЯ ↑↑↑

    console.log('Отправляемый Payload:', JSON.stringify(finalPayload, null, 2));

    const response = await fetch(`${BASE_URL}/admin/posts/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(finalPayload),
    });

    if (!response.ok) {
        const errorDetails = await response.json().catch(() => ({ detail: 'Не удалось прочитать ошибку сервера' }));
        
        if (response.status === 409) {
            console.error('Ошибка 409 (Конфликт). Ответ сервера:', errorDetails);
            throw new ConflictError('Пост с таким заголовком, вероятно, уже существует. Пожалуйста, измените заголовок.');
        }
        
        const errorMessage = errorDetails.detail || 'Ошибка данных запроса.';
        throw new Error(errorMessage);
    }
    return response.json();
  },
  
  update: async (id: number, payload: Partial<CreatePostPayload>, imageFiles?: File[]) => {
    const finalPayload: any = { status: 1 };
    
    if (payload.title) {
        finalPayload.title = payload.title;
    }
    if (payload.content) finalPayload.body = payload.content;
    if (payload.date) finalPayload.publish_date = Math.floor(new Date(payload.date).getTime() / 1000);
    if (payload.author) finalPayload.author = payload.author;
    
    // ↓↓↓ ИСПРАВЛЕНИЕ: Приведение к числу в update ↓↓↓
    if (payload.type !== undefined) finalPayload.type = Number(payload.type);
    if (payload.category !== undefined) finalPayload.category = Number(payload.category);
    // ↑↑↑ КОНЕЦ ИСПРАВЛЕНИЯ ↑↑↑

    let imageUrls: string[] = payload.image_urls || [];
    if (imageFiles && imageFiles.length > 0) {
      const uploadPromises = imageFiles.map(file => filesApi.upload(file));
      const uploadResults = await Promise.all(uploadPromises);
      const newImageUrls = uploadResults
        .map(result => result?.url)
        .filter((url): url is string => !!url);
      imageUrls = [...imageUrls, ...newImageUrls];
    }
    finalPayload.images = imageUrls;

    const response = await fetch(`${BASE_URL}/admin/posts/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(finalPayload),
    });

    if (!response.ok) {
        if (response.status === 409) {
          throw new ConflictError('Этот slug уже занят. Пожалуйста, измените заголовок.');
        }
        const errorDetails = await response.json().catch(() => ({ detail: 'Unknown error' }));
        console.error('API Error:', errorDetails);
        throw new Error(errorDetails.detail || 'Ошибка данных запроса.');
    }
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${BASE_URL}/admin/posts/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to delete post' }));
      throw new Error(error.message || 'Failed to delete post');
    }
  },

  getAuthors: async (): Promise<string[]> => {
    return ['Администрация', 'Приемная комиссия', 'Учебный отдел', 'Воспитательный отдел'];
  },
};