import { createSlice } from '@reduxjs/toolkit';
import { fetchCreators } from './operations';

const creatorsSlice = createSlice({
  name: 'creators',
  initialState: { items: [], isLoading: false, error: null },
  extraReducers: builder => {
    builder
      .addCase(fetchCreators.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchCreators.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCreators.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const creatorsReducer = creatorsSlice.reducer;
