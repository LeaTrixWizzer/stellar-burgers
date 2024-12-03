import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export const getUser = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => registerUserApi(data)
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => loginUserApi(data)
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const logout = createAsyncThunk('user/logout', async () => logoutApi());

type TUserState = {
  user: TUser;
  isAuth: boolean;
  isLoadingUser: boolean;
  errorMessage: string | null | undefined;
};

const initialState: TUserState = {
  user: { name: '', email: '' },
  isAuth: false,
  isLoadingUser: false,
  errorMessage: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuth: (state) => state.isAuth,
    selectIsLoadingUser: (state) => state.isLoadingUser,
    selectErrorMessage: (state) => state.errorMessage
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoadingUser = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoadingUser = false;
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.errorMessage = action.error.message;
        state.isAuth = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoadingUser = true;
        state.errorMessage = '';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoadingUser = false;
        state.errorMessage = '';
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.errorMessage = action.error.message!;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoadingUser = true;
        state.errorMessage = '';
        state.isAuth = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoadingUser = false;
        state.errorMessage = '';
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.errorMessage = action.error.message!;
        state.isAuth = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoadingUser = true;
        state.errorMessage = '';
        state.isAuth = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoadingUser = false;
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.errorMessage = action.error.message!;
        state.isAuth = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoadingUser = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoadingUser = false;
        if (action.payload.success) {
          state.user = { name: '', email: '' };
          state.isAuth = false;
        }
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoadingUser = false;
      });
  }
});

export const {
  selectUser,
  selectIsAuth,
  selectIsLoadingUser,
  selectErrorMessage
} = userSlice.selectors;

export const users = userSlice.reducer;
