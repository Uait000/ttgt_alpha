import { BASE_URL } from './config';

export interface LoginCredentials {
  second_name: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export const authApi = {
  // Функция изменена для отправки данных в формате JSON
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      // 1. Устанавливаем заголовок, который сообщает серверу, что мы отправляем JSON
      headers: {
        'Content-Type': 'application/json',
      },
      // 2. Преобразуем объект credentials в текстовую строку формата JSON
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Неверная фамилия или пароль');
    }

    return response.json();
  },

  // --- Остальной код без изменений ---

  async testSecretEndpoint(): Promise<any> {
    const token = localStorage.getItem('adminToken');

    if (!token) {
      throw new Error('Токен не найден');
    }

    const response = await fetch(`${BASE_URL}/auth/super-secret`, {
      headers: {
        'X-Authorization': token,
      },
    });

    if (!response.ok) {
      throw new Error('Доступ запрещен');
    }

    return response.json();
  },

  getToken(): string | null {
    return localStorage.getItem('adminToken');
  },

  setToken(token: string): void {
    localStorage.setItem('adminToken', token);
  },

  removeToken(): void {
    localStorage.removeItem('adminToken');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};