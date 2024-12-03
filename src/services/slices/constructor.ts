import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TConstructorIngredient) => {
        const id = uuidv4();
        return { payload: { ...ingredient, id } };
      }
    },

    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },

    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },

    moveIngredientUp: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredientIndex = state.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      const prevItem = state.ingredients[ingredientIndex - 1];
      state.ingredients.splice(
        ingredientIndex - 1,
        2,
        action.payload,
        prevItem
      );
    },

    moveIngredientDown: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredientIndex = state.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      const nextItem = state.ingredients[ingredientIndex + 1];
      state.ingredients.splice(ingredientIndex, 2, nextItem, action.payload);
    }
  },
  selectors: {
    selectConstructorItems: (state: TConstructorState) => state
  }
});

export const {
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveIngredientUp,
  moveIngredientDown
} = constructorSlice.actions;

export const { selectConstructorItems } = constructorSlice.selectors;

export const constructors = constructorSlice.reducer;
