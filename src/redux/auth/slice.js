import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, refreshUser } from './operations';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { username: null, email: null, avatarURL: null },
    token: null,
    isLoggedIn: false,
    isRefreshing: false, // Важливо для старту додатка
  },
  extraReducers: builder => {
    builder
      // Реєстрація
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      // Логін
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        console.log('User logged in:', action.payload.user);
      })
      // Логаут
      .addCase(logout.fulfilled, state => {
        // Повністю скидаємо стан до початкового
        state.user = { username: null, email: null, avatarURL: null };
        state.token = null;
        state.isLoggedIn = false;
        console.log('User logged out');
      })
      .addCase(logout.rejected, state => {
        // Навіть якщо логаут не вдався, ми все одно очищаємо стан
        state.user = { username: null, email: null, avatarURL: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      // Оновлення користувача (refresh)
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload; // Дані з /auth/current
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
        state.token = null; // Токен невалідний — видаляємо
      });
  },
});

export const authReducer = authSlice.reducer;
