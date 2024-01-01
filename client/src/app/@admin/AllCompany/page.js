'use client';
import Table from '@/components/Table/Table';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const AllCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3333/company/get-companies',
      );
      setCompanies(response.data);
    } catch (error) {
      console.error('Fetch Companies Error:', error.response || error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3333/company/get-company/${searchTerm}`,
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
        `http://localhost:3333/company/delete-company/${email}`,
      );
      fetchCompanies();
    } catch (error) {
      console.error('Delete Error:', error.response || error);
    }
  };

  const columns = [
    { title: '#', key: 'Count' },
    { title: 'Name', key: 'Name' },
    { title: 'Username', key: 'Username' },
    { title: 'Email', key: 'Email' },
    { title: 'Photo', key: 'Photo' },
    { title: 'Owner Name', key: 'OwnerName' },
    { title: 'License No', key: 'LicenseNo' },
    { title: 'Owner NID', key: 'OwnerNID' },
    { title: 'Actions', key: 'Actions' },
  ];

  const data = searchResult
    ? [
        {
          Count: 1,
          Name: searchResult.name,
          Username: searchResult.username,
          Email: searchResult.email,
          Photo:
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
          OwnerName: searchResult.ownerName,
          LicenseNo: searchResult.licenseNo,
          OwnerNID: searchResult.ownerNID,
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
    : companies.map((company, index) => ({
        Count: index + 1,
        Name: company.name,
        Username: company.username,
        Email: company.email,
        Photo:
          company.photo && company.photo.startsWith('data:image/') ? (
            <div className="relative rounded-full overflow-hidden h-10 w-10">
              <Image
                src={company.photo}
                alt={`Avatar for ${company.name}`}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          ) : (
            'No photo detected'
          ),
        OwnerName: company.ownerName,
        LicenseNo: company.licenseNo,
        OwnerNID: company.ownerNID,
        Actions: (
          <button
            onClick={() => handleDelete(company.email)}
            className="bg-red text-white px-2 py-1 rounded"
          >
            Delete
          </button>
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

export default AllCompany;
