import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchArticles.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const articlesReducer = articlesSlice.reducer;
