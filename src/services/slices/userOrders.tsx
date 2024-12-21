import { createSlice } from '@reduxjs/toolkit';
import { TOrdersState } from './types';
import { getUserOrders } from './get-api';

const initialState: TOrdersState = {
  orders: [],
  isLoading: true
};

export const userOrdersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    listOfOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { listOfOrders } = userOrdersSlice.selectors;
