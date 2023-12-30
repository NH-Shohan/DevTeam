// LoggedInRecruiterProfile.js
'use client';
import { AuthContext } from '@/context/AuthContext';
import React, { useContext } from 'react';

const LoggedInRecruiterProfile = () => {
  const context = useContext(AuthContext);

  const { loggedInUser } = context;
  return (
    <div className="bg-primary min-h-screen p-8 text-white">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{loggedInUser.name}</h1>

        {/* <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Expertise Skills</h2>
          <ul>
            {loggedInUser.expertiseSkills?.split(',').map((skill, index) => (
              <li key={index}>{skill.trim()}</li>
            ))}
          </ul>
        </div> */}

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">LinkedIn Profile</h2>
          <p>
            <a
              href={loggedInUser.linkedInLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue underline"
            >
              LinkedIn: {loggedInUser.linkedInLink}
            </a>
          </p>
        </div>

        {/* <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Project Links</h2>
          <ul>
            {loggedInUser.projectLinks.map((projectLink, index) => (
              <li key={index}>
                <a
                  href={projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue underline"
                >
                  Project {index + 1}: {projectLink}
                </a>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default LoggedInRecruiterProfile;
