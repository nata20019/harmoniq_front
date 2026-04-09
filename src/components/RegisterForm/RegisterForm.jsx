import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Іконки
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations.js';
import { toast } from 'react-hot-toast';
import css from './RegisterForm.module.css';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();

  // Схема валідації згідно з ТЗ
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(2, 'Username must be at least 2 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Repeat password is required'),
  });

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const payload = {
      username: values.username,
      email: values.email,
      password: values.password,
    };

    try {
      // Викликаємо реєстрацію та чекаємо результат
      const resultAction = await dispatch(register(payload));

      if (register.fulfilled.match(resultAction)) {
        toast.success('Registration successful!');
        navigate('/upload-photo');
      } else {
        toast.error(resultAction.payload || 'Something went wrong');
      }
    } catch (error) {
      toast.error('Connection error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.formWrapper}>
      <h2 className={css.title}>Register</h2>
      <p className={css.subtitle}>
        Join our community of mindfulness and well-being!
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values }) => {
          // Простий розрахунок сили пароля для ProgressBar
          const passwordLength = values.password.length;
          const progressWidth = Math.min((passwordLength / 12) * 100, 100);
          let progressColor = '#e74c3c'; // red
          if (passwordLength >= 8) progressColor = '#f1c40f'; // yellow
          if (passwordLength >= 10 && /[A-Z]/.test(values.password))
            progressColor = '#2ecc71'; // green

          return (
            <Form className={css.form}>
              {/* Username Field */}
              <div className={css.fieldGroup}>
                <label htmlFor="username" className={css.label}>
                  Enter your username
                </label>
                <Field
                  type="text"
                  name="username"
                  placeholder="Max"
                  className={`${css.input} ${
                    errors.username && touched.username ? css.inputError : ''
                  }`}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className={css.errorMessage}
                />
              </div>

              {/* Email Field */}
              <div className={css.fieldGroup}>
                <label htmlFor="email" className={css.label}>
                  Enter your email address
                </label>
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

              {/* Password Field */}
              <div className={css.fieldGroup}>
                <label htmlFor="password" className={css.label}>
                  Create a strong password
                </label>
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
                {/* Progress Bar (Required by Task) */}
                {values.password && (
                  <div className={css.progressBarContainer}>
                    <div
                      className={css.progressBarFill}
                      style={{
                        width: `${progressWidth}%`,
                        backgroundColor: progressColor,
                      }}
                    />
                  </div>
                )}
                <ErrorMessage
                  name="password"
                  component="div"
                  className={css.errorMessage}
                />
              </div>

              {/* Confirm Password Field */}
              <div className={css.fieldGroup}>
                <label htmlFor="confirmPassword" className={css.label}>
                  Repeat your password
                </label>
                <div className={css.passwordWrapper}>
                  <Field
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="********"
                    className={`${css.input} ${
                      errors.confirmPassword && touched.confirmPassword
                        ? css.inputError
                        : ''
                    }`}
                  />
                  <button
                    type="button"
                    className={css.eyeBtn}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className={css.errorMessage}
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className={css.submitBtn}>
                Create account
              </button>

              <div className={css.footerLink}>
                Already have an account?{' '}
                <Link to="/login" className={css.link}>
                  Log in
                </Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default RegisterForm;
