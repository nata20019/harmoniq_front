import axios from 'axios';

// Додаємо /api в кінець базової адреси, щоб усі запити автоматично мали правильний префікс
const BASE_URL = 'https://harmoniq-back.onrender.com/api';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export async function getArticles() {
  // Тепер запит піде на правильну адресу: ...onrender.com/api/articles
  const response = await apiClient.get('/articles');
  return response.data;
}

export const getCreators = async () => {
  // Змінюємо '/creators' на '/users', бо саме так цей маршрут названо в бекенді (app.js)
  const { data } = await apiClient.get('/users');
  return data;
};