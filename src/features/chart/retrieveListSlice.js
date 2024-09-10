import { createSlice } from '@reduxjs/toolkit';
import { getRetrieveList } from '@/app/api/chart/route';
import { impactRunId } from './impactRunListSlice';
import { activeToken } from '../auth/authSlice'; 

const RetrieveListSlice = createSlice({
  name: 'retrieveList',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setRetrieveList: (state, action) => {
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
});

export const { setRetrieveList, setError, setLoading, setLoaded } = RetrieveListSlice.actions;

export const fetchRetrieveList = () => async (dispatch, getState ) => {
  dispatch(setLoading());
  const state = getState();
  const token = activeToken(state);
  const id = impactRunId(state);
  try {
    const response = await getRetrieveList(id, token);
    dispatch(setRetrieveList(response));
    dispatch(setLoaded());
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error.toString()));
  }
};

export default RetrieveListSlice.reducer;
