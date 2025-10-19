import { BASE_URL } from './config';
import type { NewsPost, NewsDetailPost } from './config';
import { filesApi } from './files';

export class ConflictError extends Error {
  constructor(message = 'Ресурс уже существует.') {
    super(message);
    this.name = 'ConflictError';
  }
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'X-Authorization': token } : {}),
  };
};

// --- Define the expected File object structure from backend ---
interface BackendFile {
  id: string;
  name: string;
  mime: string;
}

// --- Update NewsDetailPost to expect the new 'files' structure ---
// (Assuming your config.ts defines NewsDetailPost similarly)
// You might need to adjust your actual NewsDetailPost type definition
interface UpdatedNewsDetailPost extends Omit<NewsDetailPost, 'images' | 'image_urls'> {
  files?: BackendFile[]; // Expect 'files' array from getBySlug
  image_urls?: string[]; // Keep for compatibility if needed elsewhere temporarily
}


export interface CreatePostPayload {
  title: string;
  content: string;
  author: string;
  type: number;
  // This field will now primarily hold existing file objects for update
  files?: BackendFile[];
  date: string;
  category: number;
}

export const postsApi = {
  // --- getAll: Adjusted to ensure 'images' array has IDs for compatibility ---
  getAll: async (params?: { limit?: number; offset?: number }): Promise<NewsPost[]> => {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    queryParams.append('category', '0');
    const url = `${BASE_URL}/content/posts/?${queryParams.toString()}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const rawPosts: any[] = await response.json();

    // Transform posts to include 'images' array derived from 'files' if necessary
    const transformedPosts: NewsPost[] = rawPosts.map(post => {
      let imageIds: string[] = post.images || []; // Use existing 'images' if available

      // If 'files' exists and 'images' doesn't, create 'images' from 'files'
      if (!post.images && post.files && Array.isArray(post.files)) {
        imageIds = post.files
          .filter((file: any) => file.id && file.mime?.startsWith('image/'))
          .map((file: any) => file.id);
      }
      
      // Return post with a guaranteed 'images' array for backward compatibility
      // Keep other fields as they are from the backend
      return {
          ...post, // Spread all original fields
          images: imageIds, // Ensure 'images' contains IDs
          // Optionally keep 'files' if other parts of your app use it
          // files: post.files 
      };
  });


    return transformedPosts;
  },

  // --- getBySlug: Adjusted to return the 'files' array as received ---
  getBySlug: async (slug: string): Promise<UpdatedNewsDetailPost> => {
    const response = await fetch(`${BASE_URL}/content/posts/${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    // Assume backend now returns 'files: [{id, name, mime}]'
    const postData: UpdatedNewsDetailPost = await response.json();
    
    // Add image_urls for compatibility with update form if needed
    if (postData.files) {
        postData.image_urls = postData.files.map(f => f.id);
    }

    return postData;
  },

  // --- create: Sends 'files' array instead of 'images' ---
  create: async (payload: CreatePostPayload, imageFiles?: File[]): Promise<NewsPost> => {
    let filesPayload: BackendFile[] = []; // Initialize as empty array

    if (imageFiles && imageFiles.length > 0) {
      // Create upload promises
      const uploadPromises = imageFiles.map(async (file) => {
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
    }

    const category = Number(payload.category);
    const type = Number(payload.type);

    if (isNaN(category) || isNaN(type)) {
      throw new Error('Поля "Категория" и "Тип поста" должны быть выбраны.');
    }

    // --- Send 'files' array in the payload ---
    const finalPayload = {
      title: payload.title,
      body: payload.content,
      publish_date: Math.floor(new Date(payload.date).getTime() / 1000),
      author: payload.author,
      category: category,
      type: type,
      status: 1,
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
  update: async (id: number, payload: Partial<CreatePostPayload>, imageFiles?: File[]) => {
    const finalPayload: any = { status: 1 }; // Start with status

    // --- Map standard fields ---
    if (payload.title) finalPayload.title = payload.title;
    if (payload.content) finalPayload.body = payload.content;
    if (payload.date) finalPayload.publish_date = Math.floor(new Date(payload.date).getTime() / 1000);
    if (payload.author) finalPayload.author = payload.author;
    if (payload.type !== undefined) finalPayload.type = Number(payload.type);
    if (payload.category !== undefined) finalPayload.category = Number(payload.category);
    
    // --- Handle Files ---
    // Start with existing files (payload.files should be populated by getBySlug)
    let combinedFiles: BackendFile[] = payload.files || [];

    // Upload new files if provided
    if (imageFiles && imageFiles.length > 0) {
      const uploadPromises = imageFiles.map(async (file) => {
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
      const successfullyUploadedFiles = newUploadResults.filter((result): result is BackendFile => result !== null);
      
      // Add newly uploaded files to the list
      combinedFiles = [...combinedFiles, ...successfullyUploadedFiles];
    }

    // --- Set the final 'files' payload ---
    finalPayload.files = combinedFiles;
    // finalPayload.images = undefined; // Ensure old 'images' field is not sent

    console.log('Отправляемый Payload (Update):', JSON.stringify(finalPayload, null, 2));


    const response = await fetch(`${BASE_URL}/admin/posts/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(finalPayload),
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

       if (status === 409) {
           throw new ConflictError(errorDetails.detail || 'Этот slug уже занят. Пожалуйста, измените заголовок.');
       }
       if (status === 422) {
           // Provide more specific feedback for validation errors
           const missingFields = errorDetails.detail?.map((err: any) => err.loc.join('.')) || ['unknown fields'];
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

  getAuthors: async (): Promise<string[]> => {
    return ['Администрация', 'Приемная комиссия', 'Учебный отдел', 'Воспитательный отдел'];
  },
};