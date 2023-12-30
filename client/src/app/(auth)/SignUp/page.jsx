import Button from '@/components/Button/Button';
import Link from 'next/link';

export default function SignUp() {
  return (
    <div className="container mx-auto h-screen w-screen flex justify-center items-center">
      <div className="bg-secondary p-10 rounded-xl w-1/3">
        <form className="grid grid-cols-1">
          <h2 className="text-center pb-3">Sign up</h2>

          <label className="text-gray-light small">Name</label>
          <input
            type="name"
            id="name"
            name="name"
            placeholder="Enter name"
            required
            className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
          />

          <label className="text-gray-light small">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            required
            className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
          />

          <label className="text-gray-light small">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            required
            className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
          />

          <label className="text-gray-light small">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Re-enter password"
            required
            className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
          />

          <h3>
            <Button className="w-full mb-2 mt-6" text="Sign up" fill />
          </h3>
          <p>
            Already have an account?
            <Link className="bold ml-1" href="/SignIn">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
