'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHeart } from 'react-icons/fa';
import Button from '../Button/Button';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <nav className="flex justify-between items-center h-[60px]">
        <Link href="/user">
          <h3>ArtArray</h3>
        </Link>

        <div className="flex gap-5 text-gray-light justify-between items-center">
          <Link
            href="/user"
            className={`hover:text-black transition-all ${
              pathname == '/' ? 'text-black font-bold' : ''
            }`}
          >
            <p>Home</p>
          </Link>
          <Link
            href="/user/about"
            className={`hover:text-black transition-all ${
              pathname == '/about' ? 'text-black font-bold' : ''
            }`}
          >
            <p>About</p>
          </Link>
          <Link
            href="/user/contact"
            className={`hover:text-black transition-all ${
              pathname == '/contact' ? 'text-black font-bold' : ''
            }`}
          >
            <p>Contact</p>
          </Link>
        </div>

        <div className="flex gap-5 justify-between items-center">
          <Link href="/">
            <FaHeart className="text-2xl" />
          </Link>

          <Link href={'/signin'}>
            <Button text="Login" outline />
          </Link>
        </div>
      </nav>
    </>
  );
}
