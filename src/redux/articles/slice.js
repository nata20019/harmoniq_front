import { createSlice } from '@reduxjs/toolkit';
import { fetchArticles, fetchMyArticles } from './operations';

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    items: [],
    ownItems: [], // Для статей Деббі
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
  builder
    // Для загальних статей
    .addCase(fetchArticles.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchArticles.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload; // Тут приходить масив статей
    })
    .addCase(fetchArticles.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Для статей Деббі (fetchMyArticles)
    .addCase(fetchMyArticles.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchMyArticles.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      // Якщо бекенд повертає { data: [...] }, то беремо action.payload.data
      // Якщо просто масив, то action.payload
      state.ownItems = action.payload;
    })
    .addCase(fetchMyArticles.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
        state.ownItems = []; // Очищаємо, якщо помилка
    });
}
});

export const articlesReducer = articlesSlice.reducer;
