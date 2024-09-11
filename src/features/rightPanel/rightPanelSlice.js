import { createSlice } from '@reduxjs/toolkit';

const rightPanel = createSlice({
  name: 'rightPanel',
  initialState: {
    isOpen: false,
    source: '',
  },
  reducers: {
    openRightPanel: (state, action) => {
      state.isOpen = true;
      state.source = action.payload;
    },
    closeRightPanel: (state) => {
      state.isOpen = false;
      state.source = '';
    },
  },
});

export const { openRightPanel, closeRightPanel } = rightPanel.actions;

export default rightPanel.reducer;