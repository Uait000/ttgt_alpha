import { BASE_URL, CONTESTS_ENDPOINT } from './config';
import type { Contest, ContestSubdocument } from './config';
import { filesApi } from './files';

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'X-Authorization': token } : {}),
  };
};

export interface CreateContestPayload {
  title: string;
  description?: string;
}

export interface CreateSubdocumentPayload {
  title: string;
}

export const contestsApi = {
  getAll: async (): Promise<Contest[]> => {
    const response = await fetch(`${BASE_URL}${CONTESTS_ENDPOINT}`);

    if (!response.ok) {
      throw new Error('Failed to fetch contests');
    }

    return response.json();
  },

  create: async (payload: CreateContestPayload, file: File): Promise<Contest> => {
    const uploadResult = await filesApi.upload(file, 'contests');

    const response = await fetch(`${BASE_URL}${CONTESTS_ENDPOINT}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        ...payload,
        file_url: uploadResult.url,
        file_name: file.name,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to create contest' }));
      throw new Error(error.message || 'Failed to create contest');
    }

    return response.json();
  },

  update: async (id: number, payload: Partial<CreateContestPayload>, file?: File): Promise<Contest> => {
    let fileData = {};

    if (file) {
      const uploadResult = await filesApi.upload(file, 'contests');
      fileData = {
        file_url: uploadResult.url,
        file_name: file.name,
      };
    }

    const response = await fetch(`${BASE_URL}${CONTESTS_ENDPOINT}/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ ...payload, ...fileData }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to update contest' }));
      throw new Error(error.message || 'Failed to update contest');
    }

    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${BASE_URL}${CONTESTS_ENDPOINT}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to delete contest' }));
      throw new Error(error.message || 'Failed to delete contest');
    }
  },

  addSubdocument: async (contestId: number, payload: CreateSubdocumentPayload, file: File): Promise<ContestSubdocument> => {
    const uploadResult = await filesApi.upload(file, 'contests');

    const response = await fetch(`${BASE_URL}${CONTESTS_ENDPOINT}/${contestId}/subdocuments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        ...payload,
        file_url: uploadResult.url,
        file_name: file.name,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to add subdocument' }));
      throw new Error(error.message || 'Failed to add subdocument');
    }

    return response.json();
  },

  deleteSubdocument: async (contestId: number, subdocId: number): Promise<void> => {
    const response = await fetch(`${BASE_URL}${CONTESTS_ENDPOINT}/${contestId}/subdocuments/${subdocId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to delete subdocument' }));
      throw new Error(error.message || 'Failed to delete subdocument');
    }
  },
};
