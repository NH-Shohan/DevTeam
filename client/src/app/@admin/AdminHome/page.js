// AdminProfile.js
'use client';
import { AuthContext } from '@/context/AuthContext';
import React, { useContext } from 'react';

const AdminProfile = () => {
  const context = useContext(AuthContext);

  const { loggedInUser } = context;
  return (
    <div className="min-h-screen p-8 text-white">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{loggedInUser.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">National ID</h2>
            <p>{loggedInUser.nationalId}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Permissions</h2>
            <ul>
              {loggedInUser.permissions?.map((permission, index) => (
                <li key={index}>{permission}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Role</h2>
          <p>{loggedInUser.role}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Username</h2>
          <p>{loggedInUser.username}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
