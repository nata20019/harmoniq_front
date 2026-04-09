import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast'; // Для пуш-повідомлень про помилки
import {login} from '../../redux/auth/operations.js';
import css from './LoginForm.module.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Валідація згідно з вимогами
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Тут логіка запиту на бекенд
      console.log('Logging in with:', values);
// викликаємо реальний dispatch
      await dispatch(login(values)).unwrap();
    
      // Після успіху — автоматична авторизація та редирект на HomeAuthorised
      toast.success('Welcome back!');
      // navigate('/home-authorised');
      navigate('/'); // Краще редиректити на головну, а не на окрему "authorised"
    } catch (error) {
      // Обробка помилок бекенду у вигляді пуш-повідомлення
      toast.error(
        error.message || 'Login failed. Please check your credentials.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.formWrapper}>
      <h2 className={css.title}>Login</h2>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            <div className={css.fieldGroup}>
              <label className={css.label}>Enter your email address</label>
              <Field
                type="email"
                name="email"
                placeholder="email@gmail.com"
                className={`${css.input} ${
                  errors.email && touched.email ? css.inputError : ''
                }`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.errorMessage}
              />
            </div>

            <div className={css.fieldGroup}>
              <label className={css.label}>Enter a password</label>
              <div className={css.passwordWrapper}>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="********"
                  className={`${css.input} ${
                    errors.password && touched.password ? css.inputError : ''
                  }`}
                />
                <button
                  type="button"
                  className={css.eyeBtn}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className={css.errorMessage}
              />
            </div>

            <button type="submit" className={css.submitBtn}>
              Login
            </button>

            <div className={css.footerLink}>
              Don't have an account?{' '}
              <Link to="/register" className={css.link}>
                Register
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
