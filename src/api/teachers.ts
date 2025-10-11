import { BASE_URL, TEACHERS_ENDPOINT } from './config';
import type { Teacher } from './config';

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'X-Authorization': token } : {}),
  };
};

export interface CreateTeacherPayload {
  name: string;
  position?: string;
  department?: string;
}

export const teachersApi = {
  getAll: async (): Promise<Teacher[]> => {
    const response = await fetch(`${BASE_URL}${TEACHERS_ENDPOINT}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch teachers');
    }

    return response.json();
  },

  create: async (payload: CreateTeacherPayload): Promise<Teacher> => {
    const response = await fetch(`${BASE_URL}${TEACHERS_ENDPOINT}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to create teacher' }));
      throw new Error(error.message || 'Failed to create teacher');
    }

    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${BASE_URL}${TEACHERS_ENDPOINT}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to delete teacher' }));
      throw new Error(error.message || 'Failed to delete teacher');
    }
  },
};
