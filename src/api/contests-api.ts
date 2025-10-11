import { BASE_URL, CONTESTS_ENDPOINT } from './config';
import type { Contest, ContestFile } from './config';
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
  description: string;
  image_url?: string;
  pdf_files?: ContestFile[];
  subdocuments?: ContestFile[];
  publish_date?: number;
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

export const contestsApi = {
  getAll: async (): Promise<Contest[]> => {
    const response = await fetch(`${BASE_URL}${CONTESTS_ENDPOINT}`);

    if (!response.ok) {
      throw new Error('Failed to fetch contests');
    }

    return response.json();
  },

  getBySlug: async (slug: string): Promise<Contest> => {
    const response = await fetch(`${BASE_URL}${CONTESTS_ENDPOINT}/${slug}`);

    if (!response.ok) {
      throw new Error('Failed to fetch contest');
    }

    return response.json();
  },

  create: async (payload: CreateContestPayload, imageFile?: File, pdfFiles?: File[]): Promise<Contest> => {
    const finalPayload: any = { ...payload };

    finalPayload.slug = generateSlug(payload.title);
    finalPayload.status = 1;
    finalPayload.publish_date = Math.floor(Date.now() / 1000);

    if (imageFile) {
      const uploadResult = await filesApi.upload(imageFile);
      finalPayload.image_url = uploadResult.url;
    }

    if (pdfFiles && pdfFiles.length > 0) {
      const uploadPromises = pdfFiles.map(file => filesApi.upload(file));
      const uploadResults = await Promise.all(uploadPromises);
      finalPayload.pdf_files = uploadResults.map((result, index) => ({
        title: pdfFiles[index].name.replace('.pdf', ''),
        file_url: result.url,
        file_name: pdfFiles[index].name,
      }));
    }

    const response = await fetch(`${BASE_URL}${CONTESTS_ENDPOINT}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(finalPayload),
    });

    if (!response.ok) {
      const errorDetails = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(errorDetails.detail || 'Failed to create contest');
    }

    return response.json();
  },

  update: async (id: number, payload: Partial<CreateContestPayload>, imageFile?: File, pdfFiles?: File[]): Promise<Contest> => {
    const finalPayload: any = { ...payload };

    finalPayload.status = 1;

    if (payload.title) {
      finalPayload.slug = generateSlug(payload.title);
    }

    if (imageFile) {
      const uploadResult = await filesApi.upload(imageFile);
      finalPayload.image_url = uploadResult.url;
    }

    if (pdfFiles && pdfFiles.length > 0) {
      const uploadPromises = pdfFiles.map(file => filesApi.upload(file));
      const uploadResults = await Promise.all(uploadPromises);
      finalPayload.pdf_files = uploadResults.map((result, index) => ({
        title: pdfFiles[index].name.replace('.pdf', ''),
        file_url: result.url,
        file_name: pdfFiles[index].name,
      }));
    }

    const response = await fetch(`${BASE_URL}${CONTESTS_ENDPOINT}/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(finalPayload),
    });

    if (!response.ok) {
      const errorDetails = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(errorDetails.detail || 'Failed to update contest');
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
};
