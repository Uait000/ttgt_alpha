// files.ts
import { BASE_URL } from './config';

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    ...(token ? { 'X-Authorization': token } : {}),
    // Content-Type will be added specifically in the upload function
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
  // --- REVERTED UPLOAD METHOD (Direct Body) ---
  upload: async (file: File): Promise<string | undefined> => {
    // Keep filename in URL as before
    const url = `${BASE_URL}/files?filename=${encodeURIComponent(file.name)}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          ...getAuthHeaders(),
          // Explicitly set Content-Type based on the file
          'Content-Type': file.type || 'application/octet-stream',
        },
        body: file, // Send the file directly as the body
      });

      if (!response.ok) {
        // Log status specifically for 422 errors
        if (response.status === 422) {
             console.error(`Ошибка 422 (Unprocessable Entity) при загрузке файла ${file.name}. Сервер отклонил формат запроса.`);
        }
        const errorData = await response.json().catch(() => ({ detail: `Не удалось загрузить файл. Статус: ${response.status}` }));
        console.error(`Ошибка при загрузке файла ${file.name}:`, response.status, errorData);
        return undefined; // Indicate failure
      }

      // Expect response {"id": "..."}
      const result = await response.json();
      if (!result.id) {
          console.error(`Ответ сервера при загрузке файла ${file.name} не содержит ID:`, result);
          return undefined; // Indicate failure
      }
      console.log(`Файл ${file.name} успешно загружен, ID: ${result.id}`); // Log success
      return result.id; // Return the ID on success

    } catch (error) {
      // Check if it's the specific connection reset error
      if (error instanceof Error && error.message.includes('net::ERR_CONNECTION_RESET')) {
           console.error(`Ошибка ERR_CONNECTION_RESET при загрузке файла ${file.name}. Сервер принудительно закрыл соединение. Возможно, проблема на сервере или в сети.`);
      } else {
           console.error(`Сетевая (${error instanceof Error ? error.name : 'Unknown'}) или JSON ошибка при загрузке файла ${file.name}:`, error);
      }
      return undefined; // Indicate failure
    }
  },
  // --- END REVERTED UPLOAD METHOD ---

  getAll: async (): Promise<FileInfo[]> => {
    // ... (keep as before)
    const response = await fetch(`${BASE_URL}/files`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch files');
    }

    return response.json();
  },

  delete: async (path: string): Promise<void> => {
    // ... (keep as before)
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