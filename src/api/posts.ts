import { BASE_URL } from './config';
import type { NewsPost, NewsDetailPost } from './config';
import { filesApi } from './files';

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
  image_url?: string;
  image_urls?: string[];
  date: string;
}

const generateSlug = (text: string): string => {
  const russianChars = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
  const latinChars = 'a-b-v-g-d-e-jo-zh-z-i-j-k-l-m-n-o-p-r-s-t-u-f-h-c-ch-sh-shh---y--e-ju-ja'.split('-');
  
  const baseSlug = text.toLowerCase()
    .trim()
    .replace(/\s+/g, '-') 
    .split('')
    .map(char => {
      const index = russianChars.indexOf(char);
      return index >= 0 ? latinChars[index] : char;
    })
    .join('')
    .replace(/[^a-z0-9-]/g, '') 
    .replace(/-+/g, '-');

  const truncatedSlug = baseSlug.slice(0, 9).replace(/-$/, '');
  const uniqueSuffix = Date.now().toString().slice(-5);
  return `${truncatedSlug}-${uniqueSuffix}`; 
};


export const postsApi = {
  // Функция getAllForAdmin была удалена

  getAll: async (params?: { limit?: number; offset?: number }): Promise<NewsPost[]> => {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());

    const url = `${BASE_URL}/content/news${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    return response.json();
  },

  getBySlug: async (slug: string): Promise<NewsDetailPost> => {
    const response = await fetch(`${BASE_URL}/content/news/${slug}`);

    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }

    return response.json();
  },

  create: async (payload: CreatePostPayload, imageFiles?: File[]): Promise<NewsPost> => {
    const finalPayload: any = { ...payload };

    finalPayload.body = finalPayload.content;
    delete finalPayload.content;
    finalPayload.status = 1;

    finalPayload.slug = generateSlug(payload.title);
    if (finalPayload.date) {
      finalPayload.publish_date = Math.floor(new Date(finalPayload.date).getTime() / 1000);
      delete finalPayload.date;
    }

    if (imageFiles && imageFiles.length > 0) {
      const uploadPromises = imageFiles.map(file => filesApi.upload(file, 'news'));
      const uploadResults = await Promise.all(uploadPromises);
      finalPayload.image_urls = uploadResults.map(result => result.url);
      delete finalPayload.image_url;
    } else if (!finalPayload.image_urls || finalPayload.image_urls.length === 0) {
      delete finalPayload.image_urls;
    }

    const response = await fetch(`${BASE_URL}/admin/news`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(finalPayload),
    });

    if (!response.ok) {
        const errorDetails = await response.json().catch(() => ({ detail: 'Unknown error' }));
        console.error('API Error:', errorDetails);
        throw new Error(errorDetails.detail || 'Ошибка данных запроса.');
    }

    return response.json();
  },

  update: async (id: number, payload: Partial<CreatePostPayload>, imageFiles?: File[]): Promise<NewsPost> => {
    const finalPayload: any = { ...payload };

    if (finalPayload.content !== undefined) {
      finalPayload.body = finalPayload.content;
      delete finalPayload.content;
    }

    finalPayload.status = 1;

    if (payload.title) {
        finalPayload.slug = generateSlug(payload.title);
    }
    if (finalPayload.date) {
      finalPayload.publish_date = Math.floor(new Date(finalPayload.date).getTime() / 1000);
      delete finalPayload.date;
    }

    if (imageFiles && imageFiles.length > 0) {
      const uploadPromises = imageFiles.map(file => filesApi.upload(file, 'news'));
      const uploadResults = await Promise.all(uploadPromises);
      finalPayload.image_urls = uploadResults.map(result => result.url);
      delete finalPayload.image_url;
    }

    const response = await fetch(`${BASE_URL}/admin/news/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(finalPayload),
    });

    if (!response.ok) {
        const errorDetails = await response.json().catch(() => ({ detail: 'Unknown error' }));
        console.error('API Error:', errorDetails);
        throw new Error(errorDetails.detail || 'Ошибка данных запроса.');
    }

    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${BASE_URL}/admin/news/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to delete post' }));
      throw new Error(error.message || 'Failed to delete post');
    }
  },

  getAuthors: async (): Promise<string[]> => {
    return [
      'Администрация',
      'Приемная комиссия',
      'Учебный отдел',
      'Воспитательный отдел',
    ];
  },
};