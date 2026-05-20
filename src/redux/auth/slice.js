import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, refreshUser, updateAvatar } from './operations';

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
        state.user = {
    _id: action.payload.user._id || action.payload.user.id, // ПЕРЕВІР: чи приходить _id від сервера?
    email: action.payload.user.email,
    username: action.payload.user.username,
    avatarURL: action.payload.user.avatarURL,
  };
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
        state.user = action.payload;
        // state.token = action.payload.token; // Токен з /auth/current
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.token = null; 
        state.user = { username: null, email: null, avatarURL: null }; // Очищаємо дані користувача
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        // Записуємо нову адресу аватара, яку повернув сервер
        state.user.avatarURL = action.payload.avatarURL; 
      });
  },
});

export const authReducer = authSlice.reducer;
