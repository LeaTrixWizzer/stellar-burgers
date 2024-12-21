import { createSlice } from '@reduxjs/toolkit';
import { TUserState } from './types';
import {
  loginUser,
  logoutUser,
  registerUser,
  takeUser,
  updateUser
} from './get-api';

const initialState: TUserState = {
  isAuth: false,
  user: {
    email: '',
    name: ''
  },
  error: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectIsAuth: (state) => state.isAuth,
    selectUser: (state) => state.user,
    selectName: (state) => state.user.name,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(registerUser.pending, (state) => {
        state.error = '';
      });
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.error.message!;
      })
      .addCase(loginUser.pending, (state) => {
        state.isAuth = false;
        state.error = '';
      });
    builder
      .addCase(takeUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(takeUser.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.error.message!;
      });
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.error.message!;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = '';
      });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isAuth = false;
      state.user = { email: '', name: '' };
    });
  }
});

export const { selectIsAuth, selectUser, selectName, selectError } =
  userSlice.selectors;
