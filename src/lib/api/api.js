import axios from 'axios';

const BASE_URL = 'https://harmoniq-back.onrender.com';

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

export const getCreators = async () => {
  const { data } = await apiClient.get('/creators');

  return data;
};
