import { createSlice } from '@reduxjs/toolkit';
import { getCountries } from '@/app/api/rightPanel/route';

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setCountries: (state, action) => {
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

export const { setCountries, setError, setLoading, setLoaded } = countriesSlice.actions;

export const fetchCountries = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await getCountries();
    dispatch(setCountries(response));
    dispatch(setLoaded());
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error.toString()));
  }
};

export default countriesSlice.reducer;
