import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { listOfOrders } from '../../services/slices/userOrders';
import { useDispatch, useSelector } from '../../services/store';
import { getUserOrders } from '../../services/slices/get-api';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  const orders: TOrder[] = useSelector(listOfOrders);

  return <ProfileOrdersUI orders={orders} />;
};
