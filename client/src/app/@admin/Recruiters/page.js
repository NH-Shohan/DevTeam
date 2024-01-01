'use client';
import Table from '@/components/Table/Table';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const AllRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const fetchRecruiters = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3333/recruiter/get-recruiters',
      );
      setRecruiters(response.data);
    } catch (error) {
      console.error('Fetch Recruiters Error:', error.response || error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3333/recruiter/get-recruiter/${searchTerm}`,
      );
      setSearchResult(response.data);
    } catch (error) {
      console.error('Search Error:', error.response || error);
      setSearchResult(null);
    }
  };

  const handleDelete = async (email) => {
    try {
      await axios.delete(
        `http://localhost:3333/recruiter/delete-recruiter/${email}`,
      );
      fetchRecruiters();
    } catch (error) {
      console.error('Delete Error:', error.response || error);
    }
  };

  const columns = [
    { title: '#', key: 'Count' },
    { title: 'Name', key: 'Name' },
    { title: 'Username', key: 'Username' },
    { title: 'Email', key: 'Email' },
    { title: 'Skills', key: 'Skills' },
    { title: 'Projects', key: 'Projects' },
    { title: 'LinkedIn', key: 'LinkedIn' },
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
          Skills: searchResult.expertiseSkills.join(', '),
          Projects: searchResult.projectLinks.join(', '),
          LinkedIn: searchResult.linkedInLink,
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
    : recruiters.map((recruiter, index) => ({
        Count: index + 1,
        Name: recruiter.name,
        Username: recruiter.username,
        Email: recruiter.email,
        Skills: recruiter.expertiseSkills.join(', '),
        Projects: recruiter.projectLinks.join(', '),
        LinkedIn: recruiter.linkedInLink,
        Image:
          recruiter.photo && recruiter.photo.startsWith('data:image/') ? (
            <div className="relative rounded-full overflow-hidden h-10 w-10">
              <Image
                src={recruiter.photo}
                alt={`Avatar for ${recruiter.name}`}
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
              onClick={() => handleDelete(recruiter.email)}
              className="bg-red text-white px-2 py-1 rounded"
            >
              Delete
            </button>
            <button className="bg-red text-white px-2 py-1 rounded">
              <Link href={`/Recruiters/${recruiter.email}`}>Update</Link>
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

export default AllRecruiters;
