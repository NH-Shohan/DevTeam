'use client';
import Table from '@/components/Table/Table';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import { companyData } from '../../../../public/data';

function ProgrammerInterviews() {
  const authState = useContext(AuthContext);

  const columns = [
    { title: 'Avatar', key: 'imageLink' },
    { title: 'Name', key: 'name' },
    { title: 'GitHub', key: 'gitHubLink' },
    { title: 'Role', key: 'role' },
    { title: 'Role', key: 'role' },
    { title: 'Role', key: 'role' },
  ];

  if (!authState) {
    redirect('/ProgrammerHome');
  }

  return (
    <div>
      <Table columns={columns} data={companyData} />
    </div>
  );
}

export default ProgrammerInterviews;
