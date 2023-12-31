'use client';
import Table from '@/components/Table/Table';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const AllAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3333/admin/get-admins',
      );
      setAdmins(response.data);
    } catch (error) {
      console.error('Fetch Admins Error:', error.response || error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3333/admin/me/${searchTerm}`,
      );
      setSearchResult(response.data);
    } catch (error) {
      console.error('Search Error:', error.response || error);
      setSearchResult(null);
    }
  };

  const handleDelete = async (email) => {
    try {
      await axios.delete(`http://localhost:3333/admin/delete-admin/${email}`);
      fetchAdmins();
    } catch (error) {
      console.error('Delete Error:', error.response || error);
    }
  };

  const columns = [
    { title: '#', key: 'Count' },
    { title: 'Name', key: 'Name' },
    { title: 'Username', key: 'Username' },
    { title: 'Email', key: 'Email' },
    { title: 'NID', key: 'NationalId' },
    { title: 'Role', key: 'Role' },
    { title: 'Permissions', key: 'Permissions' },
    { title: 'Image', key: 'Image' },
    { title: 'Actions', key: 'Actions' },
  ];

  const data = searchResult
    ? [
        {
          Count: 1,
          Name: searchResult.name,
          Username: searchResult.username,
          Email: searchResult.email,
          NationalId: searchResult.nationalId,
          Role: searchResult.role,
          Permissions: searchResult.permissions.join(', '),
          Image:
            searchResult.photo &&
            searchResult.photo.startsWith('data:image/') ? (
              <div className="relative rounded-full overflow-hidden h-10 w-10">
                <Image
                  src={searchResult.photo}
                  alt={`Avatar for ${searchResult.name}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            ) : (
              'No photo detected'
            ),
          Actions: (
            <button
              onClick={() => handleDelete(searchResult.email)}
              className="bg-red text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          ),
        },
      ]
    : admins.map((admin, index) => ({
        Count: index + 1,
        Name: admin.name,
        Username: admin.username,
        Email: admin.email,
        NationalId: admin.nationalId,
        Role: admin.role,
        Permissions: admin.permissions.join(', '),
        Image:
          admin.photo && admin.photo.startsWith('data:image/') ? (
            <div className="relative rounded-full overflow-hidden h-10 w-10">
              <Image
                src={admin.photo}
                alt={`Avatar for ${admin.name}`}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          ) : (
            'No photo detected'
          ),
        Actions: (
          <>
            <button
              onClick={() => handleDelete(admin.email)}
              className="bg-red text-white px-2 py-1 rounded"
            >
              Delete
            </button>
            <button className="bg-red text-white px-2 py-1 rounded">
              <Link href={`/AllAdmin/${admin.email}`}>Update</Link>
            </button>
          </>
        ),
      }));

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Search by Email
        </label>
        <div className="flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter email to search"
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

export default AllAdmin;
