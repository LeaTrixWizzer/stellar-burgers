import { createSlice } from '@reduxjs/toolkit';
import { TFeedsState } from './types';
import { getFeeds } from './get-api';

const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: true,
  error: undefined
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    selectOrdersFeeds: (state) => state.orders,
    selectTotalFeeds: (state) => state.total,
    selectTotalTodayFeeds: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      });
  }
});

export const { selectOrdersFeeds, selectTotalFeeds, selectTotalTodayFeeds } =
  feedsSlice.selectors;
