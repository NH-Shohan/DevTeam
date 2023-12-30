'use client';

import { createContext } from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children, admin, programmer, company, recruiter }) => {
  const state = true;
  const role = 'programmer';
  return (
    <AuthContext.Provider value={{ state, role }}>
      {role === '' && children}
      {role === 'admin' && admin}
      {role === 'programmer' && programmer}
      {role === 'company' && company}
      {role === 'recruiter' && recruiter}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
