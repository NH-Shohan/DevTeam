'use client';

import { usePathname } from 'next/navigation';
import DashboardNavbar from './DashboardNavbar';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <>
      <div className={`grid grid-cols-12 gap-4 h-screen py-10`}>
        <DashboardNavbar />

        <div className="col-span-9 border bg-secondary border-blue rounded-xl h-[60px] flex items-center pl-6">
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

        <div className="col-span-9 border bg-secondary border-blue rounded-xl h-[calc(100vh-140px)] w-full p-5 overflow-y-auto overflow-x-hidden scrollbar scrollbar-track-light scrollbar-thumb-gray-light scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-w-[6px]">
          {children}
        </div>
      </div>
    </>
  );
}
