'use client';
// SignIn.js
import Button from '@/components/Button/Button';
import useAuthAPI from '@/context/API/AuthAPI';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignIn() {
  const router = useRouter();
  const { login } = useAuth();
  const { loading, error, loginUser } = useAuthAPI();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await loginUser(email, password);
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
            disabled={loading}
          />
        </h3>

        {error && <p className="text-red">{error}</p>}

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
