import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredientsList = createAsyncThunk(
  'ingredients/getIngredients',
  async () => getIngredientsApi()
);

type TIngredientsState = {
  ingredients: TIngredient[];
  isLoadingIngredients: boolean;
  errorMessage: string | null | undefined;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isLoadingIngredients: false,
  errorMessage: null
};

const ingredientsSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {},
  selectors: {
    selectIngredientsList: (state) => state,
    selectIngredients: (state) => state.ingredients,
    selectIsLoadingIngredients: (state) => state.isLoadingIngredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsList.pending, (state) => {
        state.isLoadingIngredients = true;
        state.errorMessage = null;
      })
      .addCase(getIngredientsList.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoadingIngredients = false;
      })
      .addCase(getIngredientsList.rejected, (state, action) => {
        state.isLoadingIngredients = false;
        state.errorMessage = action.error.message;
      });
  }
});

export const {
  selectIngredientsList,
  selectIngredients,
  selectIsLoadingIngredients
} = ingredientsSlice.selectors;

export const ingredients = ingredientsSlice.reducer;
