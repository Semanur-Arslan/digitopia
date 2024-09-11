import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { impactRunId } from './impactRunListSlice';
import axios from 'axios';

export const fetchRetrieveList = createAsyncThunk(
  'retrieveList/fetchRetrieveList', 
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const id = impactRunId(state);
    
    try {
      const response = await axios.get(`/api/retrieveList?id=${id}`);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Veri alma başarısız'); 
    }
  }
);

const RetrieveListSlice = createSlice({
  name: 'retrieveList',
  initialState: {
    list: [],
    selectedRecommendation: null, 
    status: 'idle',
    error: null,
  },
  reducers: {
    setRetrieveList: (state, action) => {
      state.list = action.payload;
    },
    setSelectedRecommendation: (state, action) => {
      state.selectedRecommendation = action.payload;
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
      .addCase(fetchRetrieveList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRetrieveList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchRetrieveList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setRetrieveList, setSelectedRecommendation, setError, setLoading, setLoaded } = RetrieveListSlice.actions;

export default RetrieveListSlice.reducer;

