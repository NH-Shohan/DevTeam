'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import CreateRecruiter from '../../CreateRecruiter/page';

const Update = () => {
  const params = useParams();
  return <CreateRecruiter currentEmail={params.recruiter} />;
};

export default Update;
