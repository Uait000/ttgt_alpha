import { BASE_URL } from './config';

// --- ИЗМЕНЕНИЕ №1: Получаем ключ для ImgBB ---
// Безопасно получаем ваш ключ из файла .env.local
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    ...(token ? { 'X-Authorization': token } : {}),
  };
};

export interface FileInfo {
  name: string;
  path: string;
  url: string;
  size: number;
  type: string;
}

export const filesApi = {
  // --- ИЗМЕНЕНИЕ №2: Функция upload переписана для ImgBB ---
  upload: async (file: File): Promise<{ url: string }> => {
    // Проверяем, что ключ существует, иначе выбрасываем понятную ошибку
    if (!IMGBB_API_KEY) {
      throw new Error('API-ключ для ImgBB не найден. Проверьте файл .env.local и перезапустите сервер.');
    }

    const formData = new FormData();
    formData.append('image', file); // ImgBB ожидает поле с именем 'image'

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error('Ошибка от ImgBB:', data);
      throw new Error(data?.error?.message || 'Не удалось загрузить файл на ImgBB.');
    }
    
    // ImgBB возвращает URL в поле data.url
    return { url: data.data.url }; 
  },
  // --- КОНЕЦ ИЗМЕНЕНИЙ ---

  getAll: async (): Promise<FileInfo[]> => {
    const response = await fetch(`${BASE_URL}/files`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch files');
    }

    return response.json();
  },

  delete: async (path: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/files`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ path }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to delete file' }));
      throw new Error(error.message || 'Failed to delete file');
    }
  },
};