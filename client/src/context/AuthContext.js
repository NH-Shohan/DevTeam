'use client';

import { createContext } from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const state = false;
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
