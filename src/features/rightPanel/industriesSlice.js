import { createSlice } from '@reduxjs/toolkit';
import { getIndustries } from '@/app/api/rightPanel/route';

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
});

export const { setIndustries, setError, setLoading, setLoaded } = industriesSlice.actions;

export const fetchIndustries = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await getIndustries();
    dispatch(setIndustries(response));
    dispatch(setLoaded());
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error.toString()));
  }
};

export default industriesSlice.reducer;
