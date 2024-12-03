import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuth } from 'src/services/slices/user';
import { useSelector } from 'src/services/store';

type PrivateRouteProps = {
  unAuth?: boolean;
  children: React.ReactElement;
};

export const PrivateRoute = ({
  unAuth = false,
  children
}: PrivateRouteProps) => {
  const isAuth = useSelector(selectIsAuth);
  const location = useLocation();

  if (unAuth && isAuth) {
    const fromPage = location.state?.form || { path: '/' };

    return <Navigate replace to={fromPage} />;
  }

  if (!unAuth && !isAuth) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return children;
};
