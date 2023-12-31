'use client';

import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

const SetInterview = () => {
  const context = useContext(AuthContext);

  const { loggedInUser } = context;

  const [recEmail, setRecEmail] = useState('');

  const [interviewData, setInterviewData] = useState({
    appliedJob: '',
    programmerData: '',
    recruiter: '',
    company: '',
    googleMeetLink: '',
    dateTime: '',
  });

  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    // Fetch applied jobs data
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3333/company/applied-job',
        );
        setAppliedJobs(response.data);
      } catch (error) {
        console.error('Error fetching applied jobs:', error.response || error);
      }
    };

    fetchAppliedJobs();
  }, [loggedInUser.email]);
  useEffect(() => {
    if (loggedInUser.email) {
      setInterviewData((prevData) => ({
        ...prevData,
        recruiter: loggedInUser.email,
      }));
    }
  }, [loggedInUser.email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInterviewData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API call to set interview
      await axios.post(
        'http://localhost:3333/company/interview-list',
        interviewData,
      );

      console.log(interviewData);

      // Clear form after successful submission
      // setInterviewData({
      //   appliedJob: '',
      //   programmerData: '',
      //   recruiter: loggedInUser.email,
      //   company: '',
      //   googleMeetLink: '',
      //   dateTime: '',
      // });

      // Optionally, you can display a success message or redirect to another page
    } catch (error) {
      console.error('Error setting interview:', error.response || error);
      // Handle error as needed
    }
  };

  return (
    <div>
      <h2>Set Interview</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Applied Job:
          <select
            className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
            name="appliedJob"
            value={interviewData.appliedJob}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select an applied job
            </option>
            {appliedJobs.map((job) => (
              <option key={job.id} value={job.companyEmail}>
                {job.companyEmail}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label>
          Programmer Data:
          <select
            className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
            name="programmerData"
            value={interviewData.programmerData}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select a programmer
            </option>
            {appliedJobs.map((job) => (
              <option key={job.id} value={job.programmer.email}>
                {job.programmer.email}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label>
          Google Meet Link:
          <input
            className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
            type="text"
            name="googleMeetLink"
            value={interviewData.googleMeetLink}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>
          Date and Time:
          <input
            className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
            type="datetime-local"
            name="dateTime"
            value={interviewData.dateTime}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <button
          className="border border-blue py-3 px-8 rounded-lg bg-blue hover:bg-[#3333bd99] transition-all text-white flex justify-center items-center w-1/4"
          type="submit"
        >
          Set Interview
        </button>
      </form>
    </div>
  );
};

export default SetInterview;
