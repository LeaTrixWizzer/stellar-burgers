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
  async (data: string[]) => orderBurgerApi(data)
);

type TOrderState = {
  order: TOrder[];
  orderModalData: TOrder | null;
  orderRequest: boolean;
  total: number;
  totalToday: number;
  isOrderLoading: boolean;
  errorMessage: string | null | undefined;
};

const initialState: TOrderState = {
  order: [],
  orderModalData: null,
  orderRequest: false,
  total: 0,
  totalToday: 0,
  isOrderLoading: false,
  errorMessage: null
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  selectors: {
    selectOrder: (state) => state.order,
    selectOrderModalData: (state) => state.orderModalData,
    selectOrderRequest: (state) => state.orderRequest,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday,
    selectIsOrderLoading: (state) => state.isOrderLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isOrderLoading = true;
        state.errorMessage = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.order = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.errorMessage = action.error.message;
        state.order = [];
        state.total = 0;
        state.totalToday = 0;
      })
      .addCase(getOrders.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.order = action.payload;
      })
      .addCase(getOrders.rejected, (state) => {
        state.isOrderLoading = false;
      })
      .addCase(getNewOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(getNewOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(getNewOrder.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const { resetOrder } = orderSlice.actions;

export const {
  selectOrder,
  selectOrderModalData,
  selectOrderRequest,
  selectTotal,
  selectTotalToday,
  selectIsOrderLoading
} = orderSlice.selectors;

export const orders = orderSlice.reducer;
