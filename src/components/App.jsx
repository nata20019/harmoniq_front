import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { refreshUser } from '../redux/auth/operations.js';
import { selectIsRefreshing } from '../redux/auth/selectors.js';
import SharedLayout from './SharedLayout/SharedLayout.jsx';
import HomePage from '../pages/HomePage/HomePage.jsx';
import ArticlesPage from '../pages/ArticlesPage/ArticlesPage.jsx';
import RegisterPage from '../pages/RegisterPage/RegisterPage.jsx';
import LoginPage from '../pages/LoginPage/LoginPage.jsx';
import CreatorsPage from '../pages/CreatorsPage/CreatorsPage.jsx';
import { PrivateRoute } from './PrivateRoute.jsx';
import ProfilePage from '../pages/ProfilePage/ProfilePage.jsx';
import { RestrictedRoute } from './RestrictedRoute.jsx';

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  // Якщо ми ще перевіряємо токен, показуємо "Лоадер", а не сторінки
  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="creators" element={<CreatorsPage />} />
          <Route
            path="register"
            element={<RestrictedRoute component={<RegisterPage />} redirectTo='/'/>}
          />
          <Route path="login" element={<LoginPage />} />
          {/* Сторінка-заглушка для неіснуючих шляхів */}
          <Route path="*" element={<HomePage />} />
          {/* ЗАХИЩЕНИЙ МАРШРУТ */}
          <Route
            path="/profile"
            element={
              <PrivateRoute component={<ProfilePage />} redirectTo="/login" />
            }
          />
        </Route>
      </Routes>
    </>
  );
};
