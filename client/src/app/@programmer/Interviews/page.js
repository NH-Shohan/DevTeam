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
        <table className="text-left">
          <tr>
            <th>Interview ID</th>
            <td>{interview.id}</td>
          </tr>
          <hr />
          <tr>
            <th>Google Meet Link</th>
            <td>
              <a href={interview.googleMeetLink} target="_blank">
                {interview.googleMeetLink}
              </a>
            </td>
          </tr>
          <hr />
          <tr>
            <th>Date & Time</th>
            <td>{new Date(interview.dateTime).toLocaleString()}</td>
          </tr>
          <hr />
          <tr>
            <th>Recruiter</th>
            <td>{interview.recruiter.name}</td>
          </tr>
          <hr />
          <tr>
            <th>Recruiter's Expertise Skills</th>
            <td>{interview.recruiter.expertiseSkills.join(', ')}</td>
          </tr>
          <hr />
          <tr>
            <th>Recruiter's Project Links</th>
            <td>{interview.recruiter.projectLinks.join(', ')}</td>
          </tr>
          <hr />
          <tr>
            <th>Recruiter's LinkedIn Link</th>
            <td>{interview.recruiter.linkedInLink}</td>
          </tr>
          <hr />
          <tr>
            <th>Company</th>
            <td>{interview.company.name}</td>
          </tr>
          <hr />
          <tr>
            <th>Company Owner</th>
            <td>{interview.company.ownerName}</td>
          </tr>
          <hr />
          <tr>
            <th>Company License No</th>
            <td>{interview.company.licenseNo}</td>
          </tr>
          <hr />
          <tr>
            <th>Company Owner NID</th>
            <td>{interview.company.ownerNID}</td>
          </tr>
        </table>
      ))}
    </div>
  );
};

export default InterviewList;
