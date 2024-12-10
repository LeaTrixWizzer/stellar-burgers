import {
  TConstructorIngredient,
  TIngredient,
  TOrder,
  TUser
} from '@utils-types';

export type TIngredientsState = {
  ingredients: Array<TIngredient>;
  loading: boolean;
  error: string | null | undefined;
};

export type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export interface TUserState {
  isAuth: boolean;
  user: TUser;
  error: string | undefined;
}

export interface TFeedsState {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | undefined;
}

export interface TNewOrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | undefined;
}

export interface TOrdersState {
  orders: Array<TOrder>;
  isLoading: boolean;
}
