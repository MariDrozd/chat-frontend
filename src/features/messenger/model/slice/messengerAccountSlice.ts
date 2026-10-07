import { createSlice } from '@reduxjs/toolkit';
import type { MessegerAccountSchema } from '../types/messegerAccountSchema';
import { messengerAccountThunk } from '../thunks/messengerAccountThunk';

const initialState: MessegerAccountSchema = {
  loading: 'idle',
  error: null,
  messengerAccount: null,
};

const messengerAccountSlice = createSlice({
  name: 'messenger',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(messengerAccountThunk.pending, (state) => {
        state.error = null;
        state.loading = 'loading';
      })
      .addCase(messengerAccountThunk.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.messengerAccount = action.payload;
      })
      .addCase(messengerAccountThunk.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload ?? 'messeger account failed';
      });
  },
});

export const messengerAccountReducer = messengerAccountSlice.reducer;
