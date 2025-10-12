import { BASE_URL } from './config'; // Убираем TEACHERS_ENDPOINT из импорта
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
    // --- ИЗМЕНЕНИЕ: Используем правильный URL ---
    const response = await fetch(`${BASE_URL}/admin/teachers`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch teachers');
    }

    return response.json();
  },

  create: async (payload: CreateTeacherPayload): Promise<Teacher> => {
    // --- ИЗМЕНЕНИЕ: Используем правильный URL ---
    const response = await fetch(`${BASE_URL}/admin/teachers`, {
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
    // --- ИЗМЕНЕНИЕ: Используем правильный URL ---
    const response = await fetch(`${BASE_URL}/admin/teachers/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to delete teacher' }));
      throw new Error(error.message || 'Failed to delete teacher');
    }
  },
};