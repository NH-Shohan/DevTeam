'use client';

import { createContext } from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const state = false;
  const role = 'recruiter';
  return (
    <AuthContext.Provider value={{ state, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
