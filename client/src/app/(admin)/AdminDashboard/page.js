'use client';
import Table from '@/components/Table/Table';

import { AuthContext } from '@/context/AuthContext';
import { redirect } from 'next/navigation';
import { useContext } from 'react';
import { companyData } from '../../../../public/data';

function AdminDashboard() {
  const authState = useContext(AuthContext);

  const columns = [
    { title: 'Avatar', key: 'imageLink' },
    { title: 'Name', key: 'name' },
    { title: 'GitHub', key: 'gitHubLink' },
    { title: 'Role', key: 'role' },
  ];

  if (!authState) {
    redirect('/AdminHome');
  }

  return (
    <div>
      <Table columns={columns} data={companyData} />
    </div>
  );
}

export default AdminDashboard;
