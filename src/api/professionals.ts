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
  excerpt: string;
  content: string;
  author: string;
  category: 'achievement' | 'award' | 'recognition' | 'success';
  date: string;
}

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
    let imageUrls: string[] = [];

    if (imageFiles && imageFiles.length > 0) {
      for (const file of imageFiles) {
        const uploadResult = await filesApi.upload(file, 'professionals');
        imageUrls.push(uploadResult.url);
      }
    }

    const response = await fetch(`${BASE_URL}${PROFESSIONALS_ENDPOINT}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ ...payload, images: imageUrls }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to create professional' }));
      throw new Error(error.message || 'Failed to create professional');
    }

    return response.json();
  },

  update: async (id: number, payload: Partial<CreateProfessionalPayload>, imageFiles?: File[]): Promise<Professional> => {
    let imageUrls: string[] | undefined;

    if (imageFiles && imageFiles.length > 0) {
      imageUrls = [];
      for (const file of imageFiles) {
        const uploadResult = await filesApi.upload(file, 'professionals');
        imageUrls.push(uploadResult.url);
      }
    }

    const response = await fetch(`${BASE_URL}${PROFESSIONALS_ENDPOINT}/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ ...payload, ...(imageUrls ? { images: imageUrls } : {}) }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to update professional' }));
      throw new Error(error.message || 'Failed to update professional');
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
