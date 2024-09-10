import { createSlice } from '@reduxjs/toolkit';
import { getImpactRunList } from '@/app/api/chart/route';
import { activeToken } from '../auth/authSlice'; 

const ImpactRunListSlice = createSlice({
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
});


export const { setImpactRunList, setError, setLoading, setLoaded } = ImpactRunListSlice.actions;

export const fetchImpactRunList = () => async (dispatch, getState) => {
  dispatch(setLoading());
  const state = getState();
  const token = activeToken(state);
  try {
    const response = await getImpactRunList(token);
    dispatch(setImpactRunList(response));
    dispatch(setLoaded());
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error.toString()));
  }
};

export const impactRunId = (state) => state.impactRunList.list;
export default ImpactRunListSlice.reducer;
