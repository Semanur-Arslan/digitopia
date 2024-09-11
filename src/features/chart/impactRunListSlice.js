import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { activeToken } from '../auth/authSlice';

export const fetchImpactRunList = createAsyncThunk(
  'impactRunList/fetchImpactRunList',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = activeToken(state);

    try {
      const response = await axios.get(`/api/impact`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Veri alma başarısız');
    }
  }
);

const impactRunListSlice = createSlice({
  name: 'impactRunList',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setImpactRunList: (state, action) => {
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
      .addCase(fetchImpactRunList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImpactRunList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload; 
      })
      .addCase(fetchImpactRunList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setImpactRunList, setError, setLoading, setLoaded } = impactRunListSlice.actions;
export const impactRunId = (state) => state.impactRunList.list[0]?.id; 


export const selectImpactRunList = (state) => state.impactRunList.list;
export default impactRunListSlice.reducer;
