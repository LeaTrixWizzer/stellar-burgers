import {
  getFeedsApi,
  getIngredientsApi,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  orderBurgerApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getIngredientsList = createAsyncThunk(
  'ingredients/getAll',
  getIngredientsApi
);

export const takeUser = createAsyncThunk('user/get', getUserApi);

export const updateUser = createAsyncThunk('user/update', updateUserApi);

export const registerUser = createAsyncThunk('user/register', registerUserApi);

export const loginUser = createAsyncThunk('user/login', loginUserApi);

export const logoutUser = createAsyncThunk('user/logout', logoutApi);

export const getFeeds = createAsyncThunk('orders/getAll', getFeedsApi);

export const getOrder = createAsyncThunk('order/buildOrder', orderBurgerApi);

export const getUserOrders = createAsyncThunk('orders/ofUser', getOrdersApi);
