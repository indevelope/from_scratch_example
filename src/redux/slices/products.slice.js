import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from 'lib/airtable';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetchData();
    return response;
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    entries: [],
    isLoading: false
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.entries = action.payload;
      state.isLoading = false;
    }
  }
});

export default productsSlice.reducer;