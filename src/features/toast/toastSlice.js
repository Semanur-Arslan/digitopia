import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    messages: [],
  },
  reducers: {
    addToast: (state, action) => {
      state.messages.push({ 
        id: Date.now(), 
        message: action.payload.message,
        type: action.payload.type,
      });
    },
    removeToast: (state, action) => {
      state.messages = state.messages.filter(toast => toast.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
