import { createSlice } from '@reduxjs/toolkit';
import { getOrganizationDetails } from './api';
import { activeToken, selectUser } from '../auth/authSlice'; 

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
});

export const { setOrganizationDetails, setError, setLoading, setLoaded } = organizationSlice.actions;

export const fetchOrganizationDetails = () => async (dispatch, getState) => {
  const state = getState();
  const user = selectUser(state);
  const token = activeToken(state);

  if (!user || !user.organizationId) {
    return;
  }
  dispatch(setLoading());
  try {
    const response = await getOrganizationDetails(user.organizationId, token);
    dispatch(setOrganizationDetails(response));
    dispatch(setLoaded());
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error.toString()));
  }
};

export default organizationSlice.reducer;
