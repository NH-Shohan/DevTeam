'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Routes from '../Routes/Routes';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <>
      <div className={`grid grid-cols-12 gap-4 h-screen py-10`}>
        <div className="p-5 col-span-3 row-span-2 border border-light rounded-xl flex flex-col items-center relative">
          <Image
            className="rounded-full border-gray-light border-2"
            src="/user.svg"
            alt="User Image"
            width={100}
            height={100}
            priority
          />
          <p className="mt-4 bold">Nahim Hossain Shohan</p>

          <hr className="border border-light w-full my-7" />

          <Routes path="/ProgrammerHome" name={'Home'} />
          <Routes path="/ProgrammerDashboard" name={'Dashboard'} />

          <div className="absolute bottom-0 w-full p-5">
            <Link href={'/'} className="w-full">
              <button
                className={`hover:bg-red-light text-red small-bold w-full py-2 rounded-lg small text-left pl-4 transition-all`}
              >
                Logout
              </button>
            </Link>
          </div>
        </div>

        <div className="col-span-9 border border-light rounded-xl h-[60px] flex items-center pl-6">
          <h3>
            <span className="font-normal">DevTeam - </span>
            {pathname !== '/admin' ? (
              <span>
                {pathname.split('/admin/')[1]?.charAt(0)?.toUpperCase() +
                  pathname.split('/admin/')[1]?.slice(1)}
              </span>
            ) : (
              <span>Home</span>
            )}
          </h3>
        </div>

        <div className="col-span-9 border border-light rounded-xl h-[calc(100vh-140px)] w-full p-5 overflow-y-auto overflow-x-hidden scrollbar scrollbar-track-light scrollbar-thumb-gray-light scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-w-[6px]">
          {children}
        </div>
      </div>
    </>
  );
}
