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
  // --- НАЧАЛО ИСПРАВЛЕНИЙ ---
  // Функция upload переписана для работы с вашим собственным API
  upload: async (file: File): Promise<{ url: string }> => {
    // Формируем FormData, так как это стандартный и самый надежный способ передачи файлов
    // вместе с дополнительными данными (если бы они были), хотя ваш API, похоже,
    // принимает файл как сырое тело. Мы будем придерживаться безопасного стандарта FormData.
    // Если ваш API действительно требует файл как сырое тело, 
    // необходимо использовать `body: file` и проверить, какой Content-Type ожидает сервер.
    
    // ПРИМЕЧАНИЕ: Если API ожидает файл в теле, но filename в URL, 
    // как на image_d235b7.png, отправка FormData может не работать.
    // В этом случае используйте метод с сырыми данными ниже.
    
    // Используем **сырые данные** (Body: file) для соответствия вашему исходному шаблону:
    const url = `${BASE_URL}/files?filename=${encodeURIComponent(file.name)}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
        // Отправляем фактический тип файла. Это критично для бэкенда.
        'Content-Type': file.type || 'application/octet-stream',
      },
      // Отправляем сам файл как тело запроса (сырые данные)
      body: file, 
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Не удалось загрузить файл.' }));
      console.error('Ошибка при загрузке файла:', errorData);
      throw new Error(errorData.detail || 'Не удалось загрузить файл.');
    }

    const data: { url: string } = await response.json();
    
    // Возвращаем ответ от вашего сервера (предполагается, что он содержит { url: '...' })
    // Если ваш API возвращает ID файла (SHA256) в виде строки, 
    // здесь должна быть логика формирования URL типа /files/SHA256
    
    // Так как по вашим скриншотам API возвращает "string" (например, ID), 
    // и вы сохраняете относительный путь, я верну его:
    // const fileId = (data as unknown) as string;
    // return { url: `/files/${fileId}` }; 
    
    // Но, чтобы соответствовать интерфейсу { url: string } и быть ближе к исходному коду, 
    // я оставлю возврат data, предполагая, что data уже { url: 'путь/к/файлу' }
    return data; 
  },
  // --- КОНЕЦ ИСПРАВЛЕНИЙ ---

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