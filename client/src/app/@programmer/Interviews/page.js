// components/InterviewList.js
'use client';
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

const InterviewList = () => {
  const context = useContext(AuthContext);

  const { loggedInUser } = context;

  const [interviewLists, setInterviewLists] = useState([]);
  console.log({ asdfasdf: loggedInUser.email });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/company/interview-list/${loggedInUser?.email}`,
        );
        setInterviewLists(response.data);
      } catch (error) {
        console.error('Fetch Interview Lists Error:', error.response || error);
      }
    };

    fetchData();
  }, [loggedInUser?.email]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Interview Lists</h1>
      {interviewLists.map((interview, index) => (
        <div key={interview.id} className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            {index + 1}. Interview ID #{interview.id}
          </h2>
          <p>
            <strong>Google Meet Link:</strong>{' '}
            <a href={interview.googleMeetLink} target="_blank">
              {interview.googleMeetLink}
            </a>
          </p>
          <p>
            <strong>Date & Time:</strong>{' '}
            {new Date(interview.dateTime).toLocaleString()}
          </p>
          <p>
            <strong>Recruiter:</strong> {interview.recruiter.name}
          </p>
          <p>
            <strong>Recruiter's Expertise Skills:</strong>{' '}
            {interview.recruiter.expertiseSkills.join(', ')}
          </p>
          <p>
            <strong>Recruiter's Project Links:</strong>{' '}
            {interview.recruiter.projectLinks.join(', ')}
          </p>
          <p>
            <strong>Recruiter's LinkedIn Link:</strong>{' '}
            {interview.recruiter.linkedInLink}
          </p>
          <p>
            <strong>Company:</strong> {interview.company.name}
          </p>
          <p>
            <strong>Company Owner:</strong> {interview.company.ownerName}
          </p>
          <p>
            <strong>Company License No:</strong> {interview.company.licenseNo}
          </p>
          <p>
            <strong>Company Owner NID:</strong> {interview.company.ownerNID}
          </p>
          {/* Add more details as needed */}
        </div>
      ))}
    </div>
  );
};

export default InterviewList;
