'use client';

import Button from '@/components/Button/Button';
import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

export default function SignIn() {
  const router = useRouter();
  const context = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      email === 'dev@gmail.com' &&
      password === '123456' &&
      context.role === 'programmer'
    ) {
      router.replace('/ProgrammerHome');
    } else if (
      email === 'dev@admin.com' &&
      password === '123456' &&
      context.role === 'admin'
    ) {
      router.replace('/AdminHome');
    } else if (
      email === 'dev@gmail.com' &&
      password === '123456' &&
      context.role === 'admin'
    ) {
      router.replace('/CompanyHome');
    } else if (
      email === 'dev@gmail.com' &&
      password === '123456' &&
      context.role === 'admin'
    ) {
      router.replace('/RecruiterHome');
    } else {
      console.log('Invalid email or password');
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center w-screen h-screen">
      <form className="bg-secondary p-10 rounded-xl h-fit w-1/3">
        <h2 className="text-center text-blue mb-3">Sign in</h2>

        <label className="text-gray-light small">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          required
          className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
          onChange={handleChangeEmail}
        />

        <label className="text-gray-light small">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          required
          className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
          onChange={handleChangePassword}
        />

        <h3>
          <Button
            className="w-full mb-2 mt-6"
            text="Sign in"
            fill
            onClick={handleSubmit}
          />
        </h3>

        <p>
          Already have an account?
          <Link className="bold ml-1" href="/SignUp">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
