import { configureStore } from '@reduxjs/toolkit';
import { articlesReducer } from './articles/slice.js';
import { creatorsReducer } from './creators/slice.js';
import { authReducer } from './auth/slice.js';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'auth',
  storage,
};

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    creators: creatorsReducer,
    auth: persistReducer(authPersistConfig, authReducer),
  },
});
