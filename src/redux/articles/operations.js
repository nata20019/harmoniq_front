import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = 'http://localhost:5000/api';


// Асинхронний запит до бази
export const fetchArticles = createAsyncThunk(
  'articles/fetchAll',
  async (_, thunkAPI) => {

    try {
      const response = await axios.get(`${API_URL}/articles`);
      return response.data.data.articles;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchMyArticles = createAsyncThunk(
  "articles/fetchMy",
  async (_, thunkAPI) => {
    try {
      // 1. Дістаємо токен зі стейту (auth slice)
      const state = thunkAPI.getState();
      const token = state.auth.token;
// Цей лог покаже нам правду в консолі
      console.log("ПЕРЕВІРКА ТОКЕНА ПЕРЕД ЗАПИТОМ:", token);
     
      // 2. Якщо токена немає, ми навіть не робимо запит
      if (!token) {
        return thunkAPI.rejectWithValue("No token found");
      }
      // 3. Якщо токен є, додаємо його в заголовки запиту
      const response = await axios.get(`${API_URL}/articles/my`, {
        headers: {
          Authorization: `Bearer ${token}` // Якщо тут undefined, буде помилка 400
        }
      });

      // console.log("РЕАЛЬНІ ДАНІ З БЕКЕНДУ:", response.data);

      return response.data.data.result || response.data.data.articles; // Припускаємо, що бекенд повертає { data: { articles: [...] } }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const createArticle = createAsyncThunk(
  "articles/createArticle",
  async (formData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
console.log("Відправляю статтю з токеном:", token);
      const { data } = await axios.post(`${API_URL}/articles`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data' - axios додасть це автоматично для FormData
        },
      });

      // Зверни увагу: твій бекенд повертає об'єкт { data: { newArticle } }
      return data.data.newArticle; 
    } catch (error) {
      console.error("Помилка запиту:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);