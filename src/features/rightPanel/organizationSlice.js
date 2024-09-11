import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { activeToken, selectUser } from '@/features/auth/authSlice';
import axios from 'axios';

export const fetchOrganizationDetails = createAsyncThunk(
  'organization/fetchDetails',
  async (organizationId, { getState, rejectWithValue }) => {
    const state = getState();
    const user = selectUser(state);
    const token = activeToken(state);

    if (!user || !user.organizationId) {
      return rejectWithValue('Organization ID not found');
    }

    try {
      const response = await axios.get(
        `/api/profileDetails?organizationId=${user.organizationId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch organization details');
    }
  }
);

const organizationSlice = createSlice({
  name: 'organization',
  initialState: {
    details: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setOrganizationDetails: (state, action) => {
      state.details = action.payload;
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
    .addCase(fetchOrganizationDetails.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchOrganizationDetails.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.details = action.payload;
    })
    .addCase(fetchOrganizationDetails.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
},
});

export const { setOrganizationDetails, setError, setLoading, setLoaded } = organizationSlice.actions;


export default organizationSlice.reducer;
