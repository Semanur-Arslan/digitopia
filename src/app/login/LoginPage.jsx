'use client'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../api/login/route';
import { setTokens } from '../../features/auth/authSlice';
import "../../styles/login.css";
import { useState } from 'react';
import { addToast } from '@/features/toast/toastSlice';
import ButtonWithLoading from '@/components/Button';
import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const t = useTranslations('LoginPage');

  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const resultAction = await dispatch(login(formData));
      if (login.fulfilled.match(resultAction)) {
        const { idToken, refreshToken, accessToken } = resultAction.payload;
        dispatch(setTokens({
          idToken,
          refreshToken,
          accessToken
        }));
        
      } else {
        dispatch(addToast({ message: 'Login failed', type: 'error' }));
      }
    } catch (error) {
      console.error('Login failed', error);
      dispatch(addToast({ message: 'Login failed', type: 'error' }));

    }
  };

  return (
    <div className='wrapper'>
      <div className="bg-gradiend">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>
      <div className="min-h-screen flex items-center justify-center mx-4 md:mx-0 relative">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">{t('signIn')}</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                {t('email')}
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                disabled={authStatus === 'loading'}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                {t('password')}
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                disabled={authStatus === 'loading'}
              />
            </div>
            <ButtonWithLoading
              type="submit"
              isLoading={authStatus === 'loading'}
              text={t('signIn')}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
