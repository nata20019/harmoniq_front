import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCreators = createAsyncThunk(
  'creators/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      return response.data.data.users;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
