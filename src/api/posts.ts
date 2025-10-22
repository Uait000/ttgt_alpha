import {BASE_URL} from './config';
import {filesApi} from './files';
import {getAuthHeaders} from "@/api/auth.ts";

export const POST_TAGS = [
    "Новости",
    "Достижения",
    "Образование",
    "Событие"
];

export interface IncompletePost {
    id: number;
    title: string;
    body: string;
    publish_date: number;
    type: number;
    files: BackendFile[];
    category: PostCategory;
}

export interface Post extends IncompletePost {
    author: string;
}

export enum PostCategory {
    News = 0,
    Professionals = 1,
    Contests = 2,
}

export enum PostStatus {
    Draft = 0,
    Published = 1,
}

export class ConflictError extends Error {
  constructor(message = 'Ресурс уже существует.') {
    super(message);
    this.name = 'ConflictError';
  }
}

// --- Define the expected File object structure from backend ---
export interface BackendFile {
  id: string;
  name: string;
  mime: string;
}

export interface CreatePostPayload {
    title: string;
    body: string;
    publish_date: number;
    author: string;
    type: number;
    status: PostStatus;
    files: string[];
    category: PostCategory;
}

export const postsApi = {
  getAll: async (
      params?: {
          limit?: number;
          offset?: number;
          category?: PostCategory;
      }
  ): Promise<Post[]> => {
    const queryParams = new URLSearchParams();

    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    if (params?.category) queryParams.append('category', params.category.toString());

    const url = `${BASE_URL}/content/posts/?${queryParams.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    return await response.json();
  },

  getById: async (id: string): Promise<Post> => {
    const response = await fetch(`${BASE_URL}/content/posts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
      return await response.json();
  },

  create: async (
      payload: CreatePostPayload,
      files: File[] = []
  ): Promise<Post> => {
    let filesPayload: BackendFile[]; // Initialize as empty array

    // Create upload promises
    const uploadPromises: Promise<BackendFile>[] = files.map(async (file): Promise<BackendFile> => {
      try {
        const fileId = await filesApi.upload(file); // Assume this returns only the ID (string)
        if (typeof fileId === 'string' && fileId) {
          // Construct the object expected by the backend
          return {
            id: fileId,
            name: file.name,
            mime: file.type || 'application/octet-stream', // Use file type as mime, fallback if needed
          };
        }
      } catch (error) {
        console.error(`Failed to upload file ${file.name}:`, error);
      }
      return null; // Return null for failed uploads
    });

  // Wait for all uploads and filter out failed ones
  const uploadResults = await Promise.all(uploadPromises);
  filesPayload = uploadResults.filter((result): result is BackendFile => result !== null);

    const category = Number(payload.category);
    const type = Number(payload.type);

    if (isNaN(category) || isNaN(type)) {
      throw new Error('Поля "Категория" и "Тип поста" должны быть выбраны.');
    }

    // --- Send 'files' array in the payload ---
    const finalPayload = {
      title: payload.title,
      body: payload.body,
      publish_date: Math.floor(new Date(payload.publish_date).getTime() / 1000),
      author: payload.author,
      category,
      type,
      status: payload.status,
      files: filesPayload, // Use the new 'files' array
      // images: undefined // Remove old 'images' field
    };

    console.log('Отправляемый Payload (Create):', JSON.stringify(finalPayload, null, 2));

    const response = await fetch(`${BASE_URL}/admin/posts/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(finalPayload),
    });

    if (!response.ok) {
      const errorDetails = await response.json().catch(() => ({ detail: 'Не удалось прочитать ошибку сервера' }));
      if (response.status === 409) {
        console.error('Ошибка 409 (Конфликт). Ответ сервера:', errorDetails);
        throw new ConflictError('Пост с таким заголовком, вероятно, уже существует. Пожалуйста, измените заголовок.');
      }
      const errorMessage = errorDetails.detail || 'Ошибка данных запроса.';
      throw new Error(errorMessage);
    }
    return response.json();
  },

  // --- update: Sends 'files' array instead of 'images' ---
  update: async (id: number, payload: Partial<CreatePostPayload>, files?: File[]) => {
    let combinedFiles: string[] = payload.files || [];

    // Upload new files if provided
    if (files && files.length > 0) {
      const uploadPromises = files.map(async (file) => {
         try {
           const fileId = await filesApi.upload(file);
           if (typeof fileId === 'string' && fileId) {
             return { id: fileId, name: file.name, mime: file.type || 'application/octet-stream' };
           }
         } catch (error) {
           console.error(`Failed to upload file ${file.name}:`, error);
         }
         return null;
      });
      const newUploadResults = await Promise.all(uploadPromises);
      const successfullyUploadedFiles = newUploadResults
          .filter((result): result is BackendFile => result !== null)
          .map((result: BackendFile) => result.id);
      
      // Add newly uploaded files to the list
      combinedFiles = [...successfullyUploadedFiles];
    }

    payload.files = combinedFiles;

    console.log('Отправляемый Payload (Update):', payload);


    const response = await fetch(`${BASE_URL}/admin/posts/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
       // --- Enhanced Error Handling ---
       const status = response.status;
       let errorDetails;
       try {
           errorDetails = await response.json();
           console.error(`API Error (${status}):`, errorDetails);
       } catch (e) {
           errorDetails = { detail: `Failed to parse error response. Status: ${status}` };
           console.error(errorDetails.detail);
       }

       if (status === 422) {
           // Provide more specific feedback for validation errors
           const missingFields = errorDetails.detail?.map((err) => err.loc.join('.')) || ['unknown fields'];
           throw new Error(`Ошибка валидации (422): Не заполнены или некорректны поля: ${missingFields.join(', ')}`);
       }

       throw new Error(errorDetails.detail || `Ошибка данных запроса (${status}).`);
       // --- End Enhanced Error Handling ---
    }
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${BASE_URL}/admin/posts/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to delete post' }));
      throw new Error(error.message || 'Failed to delete post');
    }
  },
};