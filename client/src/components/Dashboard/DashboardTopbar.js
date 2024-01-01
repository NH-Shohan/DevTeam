'use client';
import { AuthContext } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';

function DashboardTopbar() {
  const pathname = usePathname();
  const context = useContext(AuthContext);

  return (
    <div className="col-span-9 border bg-secondary border-blue rounded-xl h-[60px] flex items-center px-6 justify-between">
      <h3>
        <span className="font-normal">DevTeam - </span>
        <span>{context.loggedInUser.name}</span>
      </h3>

      <p className="small-bold text-light">{context.role}</p>
    </div>
  );
}

export default DashboardTopbar;
