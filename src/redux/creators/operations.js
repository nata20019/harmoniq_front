import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCreators = createAsyncThunk(
  'creators/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('https://harmoniq-back.onrender.com/api/users');
      return response.data.data.users;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
