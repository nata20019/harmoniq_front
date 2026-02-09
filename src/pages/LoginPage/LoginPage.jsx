import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm.jsx';
import css from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <main className={css.pageContainer}>
      <LoginForm />
    </main>
  );
};

export default LoginPage;
