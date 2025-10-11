import { BASE_URL, PROFESSIONALS_ENDPOINT } from './config';
import type { Professional } from './config';
import { filesApi } from './files';

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'X-Authorization': token } : {}),
  };
};

export interface CreateProfessionalPayload {
  title: string;
  body: string;
  author: string;
  category: string;
  image_urls?: string[];
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

export const professionalsApi = {
  getAll: async (): Promise<Professional[]> => {
    const response = await fetch(`${BASE_URL}${PROFESSIONALS_ENDPOINT}`);

    if (!response.ok) {
      throw new Error('Failed to fetch professionals');
    }

    return response.json();
  },

  getBySlug: async (slug: string): Promise<Professional> => {
    const response = await fetch(`${BASE_URL}${PROFESSIONALS_ENDPOINT}/${slug}`);

    if (!response.ok) {
      throw new Error('Failed to fetch professional');
    }

    return response.json();
  },

  create: async (payload: CreateProfessionalPayload, imageFiles?: File[]): Promise<Professional> => {
    const finalPayload: any = { ...payload };

    finalPayload.slug = generateSlug(payload.title);
    finalPayload.status = 1;
    finalPayload.publish_date = Math.floor(Date.now() / 1000);
    finalPayload.views = 0;

    if (imageFiles && imageFiles.length > 0) {
      const uploadPromises = imageFiles.map(file => filesApi.upload(file));
      const uploadResults = await Promise.all(uploadPromises);
      finalPayload.image_urls = uploadResults.map(result => result.url);
    }

    const response = await fetch(`${BASE_URL}${PROFESSIONALS_ENDPOINT}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(finalPayload),
    });

    if (!response.ok) {
      const errorDetails = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(errorDetails.detail || 'Failed to create professional');
    }

    return response.json();
  },

  update: async (id: number, payload: Partial<CreateProfessionalPayload>, imageFiles?: File[]): Promise<Professional> => {
    const finalPayload: any = { ...payload };

    finalPayload.status = 1;

    if (payload.title) {
      finalPayload.slug = generateSlug(payload.title);
    }

    if (imageFiles && imageFiles.length > 0) {
      const uploadPromises = imageFiles.map(file => filesApi.upload(file));
      const uploadResults = await Promise.all(uploadPromises);
      finalPayload.image_urls = uploadResults.map(result => result.url);
    }

    const response = await fetch(`${BASE_URL}${PROFESSIONALS_ENDPOINT}/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(finalPayload),
    });

    if (!response.ok) {
      const errorDetails = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(errorDetails.detail || 'Failed to update professional');
    }

    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${BASE_URL}${PROFESSIONALS_ENDPOINT}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to delete professional' }));
      throw new Error(error.message || 'Failed to delete professional');
    }
  },
};
