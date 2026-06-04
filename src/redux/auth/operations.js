import axios from 'axios';
import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://harmoniq-back.onrender.com/api'; // Встановлюємо базовий URL для всіх запитів

// Утиліта для додавання токена
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Утиліта для очищення токена
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      // credentials тут — це { username, email, password }
      const res = await axios.post('/auth/register', credentials);
      // Зазвичай після реєстрації ми також хочемо залогінити юзера
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || error.message
      );
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/auth/logout');
    // Після успішного запиту на бекенд видаляємо токен з axios
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    // Читаємо токен зі стану Redux
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      // Якщо токена немає, виходимо
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      // Якщо токен є, додаємо його в хедери запиту
      setAuthHeader(persistedToken);
      const res = await axios.get('/auth/current');
      return res.data; // Бекенд поверне дані про юзера
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  '/auth/login',
  async (credentials, thunkAPI) => {
    try {
      // credentials — це об'єкт { email, password }
      const res = await axios.post('/auth/login', credentials);

      // Після успішного входу встановлюємо токен в хедери axios
      setAuthHeader(res.data.token);
      toast.success(`Welcome back, ${res.data.user.username}!`);
      // Повертаємо дані (зазвичай це { user, token })
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Invalid email or password';
      toast.error(message);
      // Обробка помилок: якщо сервер надіслав меседж — беремо його, інакше стандартний
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "auth/update",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.patch("/auth/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  'auth/updateAvatar',
  async (formData, thunkAPI) => {
    try {
      const res = await axios.patch('/users/avatars', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // КРИТИЧНО для завантаження файлів
        },
      });
      return res.data; // Бекенд має повернути об'єкт з новим { avatarURL: "..." }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);