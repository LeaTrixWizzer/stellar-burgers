import { createSlice } from '@reduxjs/toolkit';
import { TNewOrderState } from './types';
import { getOrder } from './get-api';

const initialState: TNewOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: undefined
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => initialState
  },
  selectors: {
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getOrder.pending, (state) => {
        state.orderRequest = true;
      });
  }
});

export const { resetOrder } = orderSlice.actions;
export const { selectOrderRequest, selectOrderModalData } =
  orderSlice.selectors;
