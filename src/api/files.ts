import { BASE_URL } from './config';

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
  // ✅ ИСПРАВЛЕНИЕ: Объединяем старый метод отправки с новым методом чтения ответа
  upload: async (file: File): Promise<string | undefined> => {
    const url = `${BASE_URL}/files?filename=${encodeURIComponent(file.name)}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          ...getAuthHeaders(),
          // 1. ВОЗВРАЩАЕМ ЗАГОЛОВОК: Серверу нужно знать тип файла.
          'Content-Type': file.type || 'application/octet-stream',
        },
        // 2. ВОЗВРАЩАЕМ МЕТОД: Отправляем файл напрямую, как "письмо в конверте".
        body: file,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Не удалось загрузить файл.' }));
        console.error('Ошибка при загрузке файла:', errorData);
        return undefined;
      }

      // 3. ОСТАВЛЯЕМ МЕТОД: Читаем ответ как JSON, потому что он приходит в формате {"id": "..."}.
      const result = await response.json();
      return result.id;

    } catch (error) {
        console.error('Сетевая или JSON ошибка при загрузке файла:', error);
        return undefined;
    }
  },

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