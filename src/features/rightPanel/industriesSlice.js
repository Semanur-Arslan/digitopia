import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchIndustries = createAsyncThunk(
  'industries/fetchİndustries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/industries`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Veri alma başarısız');
    }
  }
);
const industriesSlice = createSlice({
  name: 'industries',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setIndustries: (state, action) => {
      state.list = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state) => {
      state.status = 'loading';
    },
    setLoaded: (state) => {
      state.status = 'succeeded';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIndustries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIndustries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
        state.error = null;
      })
      .addCase(fetchIndustries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setIndustries, setError, setLoading, setLoaded } = industriesSlice.actions;

export default industriesSlice.reducer;
