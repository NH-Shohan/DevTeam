'use client';
// loggedInUserProfile.js
import { AuthContext } from '@/context/AuthContext';
import React, { useContext } from 'react';

const LoggedInUserProfile = () => {
  const context = useContext(AuthContext);

  const { loggedInUser } = context;
  return (
    <div className="min-h-screen p-8 text-white">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{loggedInUser.name}</h1>
        <p className="text-lg mb-6">{loggedInUser.bio}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
            <p>{loggedInUser.contactInformation}</p>
            <p>{loggedInUser.email}</p>
            <p>{loggedInUser.location}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Education</h2>
            <p>{loggedInUser.education}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Experiences</h2>
          <p>{loggedInUser.experiences} years of experience</p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">GitHub Profile</h2>
          <p>{loggedInUser.gitHubloggedInUsername}</p>
        </div>

        {loggedInUser.projects && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Projects</h2>
            <ul>
              {loggedInUser.projects.split(',').map((project, index) => (
                <li key={index}>{project.trim()}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Social Media</h2>
          <p>
            <a
              href={loggedInUser.socialMediaLinks}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue underline"
            >
              GitHub Profile: {loggedInUser.socialMediaLinks}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoggedInUserProfile;
