import { getFeedsApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getFeeds = createAsyncThunk('orders/getFeeds', async () =>
  getFeedsApi()
);

export const getOrders = createAsyncThunk('orders/getOrders', async () =>
  getOrdersApi()
);

export const getNewOrder = createAsyncThunk(
  'orders/getNewOrder',
  orderBurgerApi
);

type TOrderState = {
  orders: TOrder[];
  orderModalData: TOrder | null;
  orderRequest: boolean;
  total: number;
  totalToday: number;
  errorMessage: string | null | undefined;
};

const initialState: TOrderState = {
  orders: [],
  orderModalData: null,
  orderRequest: false,
  total: 0,
  totalToday: 0,
  errorMessage: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => initialState
  },
  selectors: {
    selectOrder: (state) => state.orders,
    selectOrderModalData: (state) => state.orderModalData,
    selectOrderRequest: (state) => state.orderRequest,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.errorMessage = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getNewOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(getNewOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(getNewOrder.rejected, (state, action) => {
        state.errorMessage = action.error.message;
      });
  }
});

export const { resetOrder } = orderSlice.actions;

export const {
  selectOrder,
  selectOrderModalData,
  selectOrderRequest,
  selectTotal,
  selectTotalToday
} = orderSlice.selectors;

export const orders = orderSlice.reducer;
