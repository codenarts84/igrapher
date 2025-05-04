import { configureStore, createSlice } from '@reduxjs/toolkit';
import { gData as initialGData } from './testData';

// Initial state
const initialState = {
  gData: initialGData, // Make sure initialGData is defined or imported
};

const graphDataSlice = createSlice({
  name: 'graphData',
  initialState,
  reducers: {
    setGData (state, action) {
      state.gData = action.payload;
    },
  },
});

export const { setGData } = graphDataSlice.actions;

const store = configureStore({
  reducer: {
    graphData: graphDataSlice.reducer,
  },
});

export default store;
