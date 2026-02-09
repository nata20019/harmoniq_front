import { apiClient } from './api';

export const login = async credentials => {
  const res = await apiClient.post('/auth/signin', credentials);
  return res.data;
};
