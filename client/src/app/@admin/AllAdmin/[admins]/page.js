'use client';
import React from 'react';
import CreateAdmin from '../../CreateAdmin/page';
import { useParams } from 'next/navigation';

const Update = () => {
  const params = useParams();
  console.log(JSON.stringify(params));
  return <CreateAdmin currentEmail={params.admins} />;
};

export default Update;
