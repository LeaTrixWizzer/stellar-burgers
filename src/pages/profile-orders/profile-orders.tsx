import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { getIngredientsList } from '../../services/slices/ingredient';
import {
  getOrders,
  selectOrder,
  resetOrder
} from '../../services/slices/order';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetOrder());
    Promise.all([dispatch(getIngredientsList()), dispatch(getOrders())]);
  }, []);

  const orders = useSelector(selectOrder);

  if (!orders) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
