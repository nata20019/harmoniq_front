import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    },
  withCredentials: true,
});
    
export async function getArticles() {
  const response = await apiClient.get('/articles');
  return response.data;
}
