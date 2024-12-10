import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { selectOrdersFeeds } from '../../services/slices/feeds';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../services/slices/get-api';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  const orders: TOrder[] = useSelector(selectOrdersFeeds);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleGetAllFeeds = () => {
    dispatch(getFeeds());
  };

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        handleGetAllFeeds;
      }}
    />
  );
};
