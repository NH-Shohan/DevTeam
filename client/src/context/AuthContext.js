// AuthContext.js
'use client';
import { createContext, useContext, useEffect, useState } from 'react';

import { redirect, usePathname, useRouter } from 'next/navigation';
import path from 'path';
import Cookies from 'js-cookie';
export const AuthContext = createContext({});

export const AuthProvider = ({
  children,
  admin,
  programmer,
  company,
  recruiter,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState(() => {
    const storedState = window.localStorage.getItem('authState');
    return storedState
      ? JSON.parse(storedState)
      : { isAuthenticated: false, role: '', session: null };
  });
  console.log(pathname);
  useEffect(() => {
    if (!state?.session || !state?.isAuthenticated) {
      router.push('/'); // Redirect to login page after logout
      //  // Redirect to login page after logout
      // if (pathname !== '/') {
      //   redirect('/');
      // }
    }
  }, [state, router, pathname]);

  console.log({ 'shohaner heda': state });

  useEffect(() => {
    window.localStorage.setItem('authState', JSON.stringify(state));
  }, [state]);

  const login = (role, session) => {
    setState({ isAuthenticated: true, role, session });
  };

  const logout = () => {
    Cookies.remove('session');
    setState({ isAuthenticated: false, role: '', session: null });
    // router.push('/');
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {!state.isAuthenticated && children}
      {state.role === 'admin' && state.isAuthenticated && admin}
      {state.role === 'programmer' && state.isAuthenticated && programmer}
      {state.role === 'company' && state.isAuthenticated && company}
      {state.role === 'recruiter' && state.isAuthenticated && recruiter}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
