import { BASE_URL } from './config';

// Безопасно получаем ваши ключи из файла .env.local
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

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
  // --- НАЧАЛО ИЗМЕНЕНИЙ ---
  upload: async (file: File): Promise<{ url: string }> => {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      throw new Error('Ключи для Cloudinary не найдены. Проверьте файл .env.local и перезапустите сервер.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    // 1. Читаем ответ от сервера ОДИН РАЗ
    const data = await response.json();

    // 2. ПРОВЕРЯЕМ, был ли ответ успешным
    if (!response.ok) {
      // Если нет, выводим ошибку из полученных данных и прерываем выполнение
      console.error('Ошибка от Cloudinary:', data);
      throw new Error('Не удалось загрузить файл на Cloudinary.');
    }
    
    // 3. Если все хорошо, возвращаем URL
    return { url: data.secure_url }; 
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