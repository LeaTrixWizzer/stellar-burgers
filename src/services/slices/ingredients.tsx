import { createSlice } from '@reduxjs/toolkit';
import { getIngredientsList } from './get-api';
import { TIngredientsState } from './types';

const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredientsState: (state) => state,
    selectLoadingIngredients: (state) => state.loading,
    selectIngredients: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredientsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredientsList.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export const {
  selectIngredients,
  selectIngredientsState,
  selectLoadingIngredients
} = ingredientsSlice.selectors;
