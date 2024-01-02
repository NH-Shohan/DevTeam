'use client';
import Table from '@/components/Table/Table';
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

const AppliedJobs = () => {
  const context = useContext(AuthContext);

  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/company/applied-job/${context.loggedInUser.email}`,
        );
        setAppliedJobs(response.data);
      } catch (error) {
        console.error('Fetch Applied Jobs Error:', error.response || error);
      }
    };
    fetchAppliedJobs();
  }, [context.loggedInUser.email]);

  const columns = [
    { title: '#', key: 'id' },
    { title: 'Company', key: 'companyName' },
    { title: 'Job Description', key: 'jobDescription' },
    { title: 'Job Role', key: 'jobRole' },
    { title: 'Job Seat', key: 'jobSeat' },
    { title: 'Expire Date', key: 'jobExpireDate' },
    { title: 'Joining Date', key: 'joiningDate' },
    { title: 'Required Skills', key: 'requiredSkills' },
    { title: 'Interviewer', key: 'interviewer' },
    { title: 'Status', key: 'status' },
  ];

  console.log(context.loggedInUser.email, appliedJobs);

  const data = appliedJobs.map((appliedJob) => ({
    id: appliedJob?.id,
    companyName: appliedJob?.availableJob?.company?.name || 'N/A',
    jobDescription: appliedJob?.availableJob?.jobDescription || 'N/A',
    jobRole: appliedJob?.availableJob?.jobRole || 'N/A',
    jobSeat: appliedJob?.availableJob?.jobSeat || 'N/A',
    jobExpireDate: appliedJob?.availableJob?.jobExpireDate || 'N/A',
    joiningDate: appliedJob?.availableJob?.joiningDate || 'N/A',
    requiredSkills:
      appliedJob?.availableJob?.requiredSkills?.join(', ') || 'N/A',
    interviewer: appliedJob?.availableJob?.interviewer?.name || 'N/A',
    status: appliedJob?.availableJob?.status || 'N/A',
  }));

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Applied Jobs</h1>

      <Table columns={columns} data={data} />
    </div>
  );
};

export default AppliedJobs;
