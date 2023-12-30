// pages/404.js
'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const NotFound = () => {
  const storedState = localStorage.getItem('authState');
  const router = useRouter();

  useEffect(() => {
    if (
      !JSON.parse(storedState)?.session ||
      !JSON.parse(storedState)?.isAuthenticated
    ) {
      router.push('/'); // Redirect to login page after logout
      //  // Redirect to login page after logout
      // if (pathname !== '/') {
      //   redirect('/');
      // }
    }
  }, [router, storedState]);

  return <></>;
};

export default NotFound;
