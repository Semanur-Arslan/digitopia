import { createSlice } from '@reduxjs/toolkit';

const rightPanel = createSlice({
  name: 'rightPanel',
  initialState: {
    isOpen: false,
  },
  reducers: {
    openRightPanel: (state) => {
      state.isOpen = true;
    },
    closeRightPanel: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openRightPanel, closeRightPanel } = rightPanel.actions;

export default rightPanel.reducer;
