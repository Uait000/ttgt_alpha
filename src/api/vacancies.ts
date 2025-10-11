import { BASE_URL, VACANCIES_ENDPOINT } from './config';
import type { Vacancy } from './config';

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'X-Authorization': token } : {}),
  };
};

export interface CreateVacancyPayload {
  title: string;
  department: string;
  salary: string;
  description?: string;
}

export const vacanciesApi = {
  getAll: async (): Promise<Vacancy[]> => {
    const response = await fetch(`${BASE_URL}${VACANCIES_ENDPOINT}`);

    if (!response.ok) {
      throw new Error('Failed to fetch vacancies');
    }

    return response.json();
  },

  getById: async (id: number): Promise<Vacancy> => {
    const response = await fetch(`${BASE_URL}${VACANCIES_ENDPOINT}/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch vacancy');
    }

    return response.json();
  },

  create: async (payload: CreateVacancyPayload): Promise<Vacancy> => {
    const response = await fetch(`${BASE_URL}${VACANCIES_ENDPOINT}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to create vacancy' }));
      throw new Error(error.message || 'Failed to create vacancy');
    }

    return response.json();
  },

  update: async (id: number, payload: Partial<CreateVacancyPayload>): Promise<Vacancy> => {
    const response = await fetch(`${BASE_URL}${VACANCIES_ENDPOINT}/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to update vacancy' }));
      throw new Error(error.message || 'Failed to update vacancy');
    }

    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${BASE_URL}${VACANCIES_ENDPOINT}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to delete vacancy' }));
      throw new Error(error.message || 'Failed to delete vacancy');
    }
  },
};
