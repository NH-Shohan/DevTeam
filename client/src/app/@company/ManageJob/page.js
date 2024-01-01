'use client';
import Table from '@/components/Table/Table';
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

const Interviews = () => {
  const context = useContext(AuthContext);

  const { loggedInUser } = context;
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [signedEmail, setSignedEmail] = useState();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/company/available-jobs/${loggedInUser.email}`,
        );
        setJobs(response.data);
      } catch (error) {
        console.error('Fetch Jobs Error:', error.response || error);
      }
    };
    fetchJobs();
  }, [loggedInUser.email]);
  useEffect(() => {
    setSignedEmail(loggedInUser.email);
  }, [loggedInUser.email]);

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

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(
        `http://localhost:3333/company/available-jobs/${jobId}`,
      );
      // Optionally, you can fetch the jobs again to update the list
      fetchJobs();
    } catch (error) {
      console.error('Delete Error:', error.response || error);
    }
  };

  const columns = [
    { title: '#', key: 'id' },
    { title: 'Company', key: 'companyName' },
    { title: 'Email', key: 'companyEmail' },
    { title: 'Job Description', key: 'jobDescription' },
    { title: 'Job Role', key: 'jobRole' },
    { title: 'Job Seat', key: 'jobSeat' },
    { title: 'Expire Date', key: 'jobExpireDate' },
    { title: 'Joining Date', key: 'joiningDate' },
    { title: 'Required Skills', key: 'requiredSkills' },
    { title: 'Interviewer', key: 'interviewer' },
    { title: 'Actions', key: 'Actions' },
  ];

  const data = searchResult
    ? [
        {
          id: searchResult.id,
          companyName: searchResult.company.name,
          companyEmail: searchResult.company.email,
          jobDescription: searchResult.jobDescription,
          jobRole: searchResult.jobRole,
          jobSeat: searchResult.jobSeat,
          jobExpireDate: searchResult.jobExpireDate,
          joiningDate: searchResult.joiningDate,
          requiredSkills: searchResult.requiredSkills.join(', '),
          interviewer: searchResult.interviewer
            ? searchResult.interviewer.name
            : 'N/A',
          Actions: (
            <>
              {/* <button
                onClick={() =>
                  handleApply(searchResult.id, searchResult.company.email)
                }
                className="bg-green text-white px-2 py-1 rounded"
              >
                Apply
              </button>
              <button
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
        requiredSkills: job.requiredSkills.join(', '),
        interviewer: job.interviewer ? job.interviewer.name : 'N/A',
        Actions: (
          <>
            {/* <button
              onClick={() => handleApply(job.id, job.company.email)}
              className="bg-red text-white px-2 py-1 rounded"
            >
              Delete
            </button> */}
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
