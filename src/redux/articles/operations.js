import { createAsyncThunk } from "@reduxjs/toolkit";
// import { useEffect } from "react";
import axios from "axios";

const API_URL = 'http://localhost:5000/api';


// Асинхронний запит до бази
export const fetchArticles = createAsyncThunk(
  'articles/fetchAll',
  async (_, thunkAPI) => {
//     useEffect(() => {
//       const user = thunkAPI.getState().auth.user; // Дістаємо користувача зі стейту
//   const fetchArticles = async () => {
//     const token = user?.token; // Переконайтеся, що ви отримуєте токен
//     if (!token) return;
 
//     try {
//       const response = await axios.get(`${API_URL}/articles/my`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       console.log("Статті:", response.data);
//     } catch (error) {
//       console.error("Помилка:", error);
//     }
//   };
 
//   fetchArticles();
// }, []);

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

      // ЛОГ ДЛЯ ПЕРЕВІРКИ: подивись у консоль браузера, що тут виведе
      console.log("РЕАЛЬНІ ДАНІ З БЕКЕНДУ:", response.data);

      return response.data.data.result || response.data.data.articles; // Припускаємо, що бекенд повертає { data: { articles: [...] } }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);