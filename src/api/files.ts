import { BASE_URL } from './config';

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    // Content-Type будет установлен браузером автоматически для FormData/файла
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
  // Функция upload переписана для работы с вашим собственным API
  upload: async (file: File): Promise<{ url: string }> => {
    // Формируем URL с именем файла в query-параметрах, как просил разработчик
    const url = `${BASE_URL}/files?filename=${encodeURIComponent(file.name)}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
        // Указываем тип контента, который отправляем. Это важно.
        'Content-Type': file.type || 'application/octet-stream',
      },
      // Отправляем тело файла как есть (бинарные данные)
      body: file,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Не удалось загрузить файл.' }));
      console.error('Ошибка при загрузке файла:', errorData);
      throw new Error(errorData.detail || 'Не удалось загрузить файл.');
    }

    const data = await response.json();
    
    // Возвращаем ответ от вашего сервера (предполагается, что он содержит { url: '...' })
    return data; 
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