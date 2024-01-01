'use client';
// Interviews.jsx
import Table from '@/components/Table/Table';
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

const Interviews = () => {
  const context = useContext(AuthContext);

  const { loggedInUser } = context;
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [signedEmail, setSignedEmail] = useState();

  useEffect(() => {
    fetchJobs();
  }, []);
  useEffect(() => {
    setSignedEmail(loggedInUser.email);
  }, [loggedInUser.email]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3333/company/available-jobs',
      );
      setJobs(response.data);
    } catch (error) {
      console.error('Fetch Jobs Error:', error.response || error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3333/company/available-jobs/${searchTerm}`,
      );
      setSearchResult(response.data);
    } catch (error) {
      console.error('Search Error:', error.response || error);
      setSearchResult(null);
    }
  };

  const handleApply = async (jobId, companyEmail) => {
    // Replace this with the actual logged-in user data
    console.log({ jobId, companyEmail, signedEmail });
    try {
      await axios.post('http://localhost:3333/company/applied-job', {
        programmer: signedEmail,
        availableJob: jobId,
        companyEmail: companyEmail,
      });

      // You can perform additional actions after successful application if needed
      console.log('Application successful');
    } catch (error) {
      alert('Already applied!');
      console.error('Apply Error:', error.response || error);
      // Handle the error or provide user feedback
    }
  };

  const columns = [
    { title: '#', key: 'id' },
    { title: 'Company', key: 'companyName' },
    { title: 'Company Email', key: 'companyEmail' },
    { title: 'Job Description', key: 'jobDescription' },
    { title: 'Job Role', key: 'jobRole' },
    { title: 'Job Seat', key: 'jobSeat' },
    { title: 'Expire Date', key: 'jobExpireDate' },
    { title: 'Joining Date', key: 'joiningDate' },
    { title: 'Required Skills', key: 'requiredSkills' },
    { title: 'Interviewer', key: 'interviewer' },
    { title: 'Actions', key: 'Actions' },
  ];
  console.log({ searchResult });
  const data = searchResult
    ? [
        {
          id: searchResult[0]?.id,
          companyName: searchResult[0]?.company?.name || 'N/A',
          companyEmail: searchResult[0]?.company?.email || 'N/A',
          jobDescription: searchResult[0]?.jobDescription || 'N/A',
          jobRole: searchResult[0]?.jobRole || 'N/A',
          jobSeat: searchResult[0]?.jobSeat || 'N/A',
          jobExpireDate: searchResult[0]?.jobExpireDate || 'N/A',
          joiningDate: searchResult[0]?.joiningDate || 'N/A',
          requiredSkills: searchResult[0]?.requiredSkills?.join(', ') || 'N/A',
          interviewer: searchResult[0]?.interviewer
            ? searchResult[0]?.interviewer.name || 'N/A'
            : 'N/A',
          Actions: (
            <>
              <button
                onClick={() =>
                  handleApply(searchResult[0].id, searchResult[0].company.email)
                }
                className="bg-red text-white px-2 py-1 rounded"
              >
                Apply
              </button>
              {/* <button
                onClick={() => handleDelete(searchResult.id)}
                className="bg-red text-white px-2 py-1 rounded"
              >
                Delete
              </button> */}
            </>
          ),
        },
      ]
    : jobs.map((job) => ({
        id: job.id,
        companyName: job.company.name,
        companyEmail: job.company.email,
        jobDescription: job.jobDescription,
        jobRole: job.jobRole,
        jobSeat: job.jobSeat,
        jobExpireDate: job.jobExpireDate,
        joiningDate: job.joiningDate,
        requiredSkills: job.requiredSkills?.join(', '),
        interviewer: job?.interviewer ? job.interviewer?.name : 'N/A',
        Actions: (
          <>
            <button
              onClick={() => handleApply(job.id, job.company.email)}
              className="bg-red text-white px-2 py-1 rounded"
            >
              Apply
            </button>
          </>
        ),
      }));

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Search by Job ID
        </label>
        <div className="flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter job ID to search"
            className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
          />
          <button
            onClick={handleSearch}
            className="ml-2 border transition-all bg-blue px-4 rounded-lg h-[48px] hover:bg-secondary hover:border-blue"
          >
            Search
          </button>
        </div>
      </div>

      <Table columns={columns} data={data} />
    </div>
  );
};

export default Interviews;
