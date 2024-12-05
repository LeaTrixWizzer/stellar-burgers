import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, OrderInfo } from '@components';
import { Route, Routes } from 'react-router-dom';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route path='/login' element={<Login />} />
      // todo protected
      <Route path='/register' element={<Register />} />
      // todo protected
      <Route path='/forgot-password' element={<ForgotPassword />} />
      // todo protected
      <Route path='/reset-password' element={<ResetPassword />} />
      // todo protected
      <Route path='/profile' element={<Profile />} />
      // todo: protected
      <Route path='/profile/orders' element={<ProfileOrders />} />
      // todo protected
      <Route path='*' element={<NotFound404 />} />
      <Route path='/feed/:number' element={<OrderInfo />} />
      // todo modal
      <Route path='/ingredients/:id' element={<IngredientDetails />} />
      // todo modal
      <Route path='/profile/orders/:number' element={<OrderInfo />} />
      // todo protected and modal
    </Routes>
  </div>
);

export default App;
