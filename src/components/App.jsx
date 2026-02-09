import { Routes, Route } from 'react-router-dom';
import SharedLayout from './SharedLayout/SharedLayout.jsx';
import HomePage from '../pages/HomePage/HomePage.jsx';
import ArticlesPage from '../pages/ArticlesPage/ArticlesPage.jsx';
import RegisterPage from '../pages/RegisterPage/RegisterPage.jsx';
import LoginPage from '../pages/LoginPage/LoginPage.jsx';
import CreatorsPage from '../pages/CreatorsPage/CreatorsPage.jsx';
import { login } from 'lib/api/clientApi.js';

export const App = () => {
  login({
    username: 'mnb@pererat.com',
    password: '$2b$10$mCkmTq/bzcgmN16TQEfHO.hHWvuks3JomgcAcNuJ/SrqwEhqhvN.C',
  });
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="articles" element={<ArticlesPage />} />
        <Route path="create-article" element={<CreatorsPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        {/* Сторінка-заглушка для неіснуючих шляхів */}
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
};
