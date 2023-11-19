import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    activeLoading: (state) => {
      state.isLoading = true;
    },
    deActiveLoaing: (state) => {
      state.isLoading = false;
    },
  },
});

export default loadingSlice.reducer;
export const { activeLoading, deActiveLoaing } = loadingSlice.actions;
