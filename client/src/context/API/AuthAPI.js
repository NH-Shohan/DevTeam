'use client';
// AuthAPI.js
import { useEffect, useState } from 'react';
import axiosInstance from './Base';
import { useAuth } from '../AuthContext';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const useAuthAPI = () => {
  const { login, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const loginUser = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });

      //   document.cookie = `session=${JSON.parse(
      //     response.data.session,
      //   )}; expires=${response.data.session.cookie.expires}; path=/`;
      Cookies.set('session', JSON.stringify(response.data.session), {
        expires: 86400,
      });
      login(response.data.role, response.data.session);

      return response.data.session;
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    // router.push('/');
    logout();
  };

  return { loading, error, loginUser, logoutUser };
};

export default useAuthAPI;
