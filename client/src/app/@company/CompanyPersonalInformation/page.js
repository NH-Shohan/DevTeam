// LoggedInCompanyProfile.js
'use client';
import { AuthContext } from '@/context/AuthContext';
import React, { useContext } from 'react';

const LoggedInCompanyProfile = () => {
  const context = useContext(AuthContext);

  const { loggedInUser } = context;
  return (
    <div className="min-h-screen p-8 text-white">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{loggedInUser.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">License No</h2>
            <p>{loggedInUser.licenseNo}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Owner Information</h2>
            <p>{loggedInUser.ownerName}</p>
            <p>{loggedInUser.ownerNID}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <p>{loggedInUser.contactInformation}</p>
          <p>{loggedInUser.email}</p>
        </div>

        {/* <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Profile Photo</h2>
          <img
            src={loggedInUser.photo}
            alt="Company Photo"
            className="w-full h-auto"
          />
        </div> */}

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Social Media</h2>
          <p>
            <a
              href={loggedInUser.socialMediaLinks}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue underline"
            >
              Company Website: {loggedInUser.socialMediaLinks}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoggedInCompanyProfile;
