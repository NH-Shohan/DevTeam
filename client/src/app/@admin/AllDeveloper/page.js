'use client';
import Table from '@/components/Table/Table';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const AllDeveloper = () => {
  const [developers, setDevelopers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3333/programmer/profile',
      );
      setDevelopers(response.data);
    } catch (error) {
      console.error('Fetch Developers Error:', error.response || error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3333/programmer/me/${searchTerm}`,
      );
      setSearchResult(response.data);
    } catch (error) {
      console.error('Search Error:', error.response || error);
      setSearchResult(null);
    }
  };

  const handleDelete = async (email) => {
    try {
      await axios.delete(`http://localhost:3333/programmer/delete/${email}`);
      fetchDevelopers();
    } catch (error) {
      console.error('Delete Error:', error.response || error);
    }
  };

  const columns = [
    { title: '#', key: 'Count' },
    { title: 'Name', key: 'Name' },
    { title: 'Email', key: 'Email' },
    { title: 'GitHub Username', key: 'GitHubUsername' },
    { title: 'Photo', key: 'Photo' },
    { title: 'Bio', key: 'Bio' },
    { title: 'Contact Information', key: 'ContactInformation' },
    { title: 'Location', key: 'Location' },
    { title: 'Social Media Links', key: 'SocialMediaLinks' },
    { title: 'Education', key: 'Education' },
    { title: 'Projects', key: 'Projects' },
    { title: 'Experiences', key: 'Experiences' },
    { title: 'Actions', key: 'Actions' },
  ];

  const data = searchResult
    ? [
        {
          Count: 1,
          Name: searchResult.name,
          Email: searchResult.email,
          GitHubUsername: searchResult.gitHubUsername,
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
          Bio: searchResult.bio,
          ContactInformation: searchResult.contactInformation,
          Location: searchResult.location,
          SocialMediaLinks: searchResult.socialMediaLinks,
          Education: searchResult.education,
          Projects: searchResult.projects,
          Experiences: searchResult.experiences,
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
    : developers.map((developer, index) => ({
        Count: index + 1,
        Name: developer.name,
        Email: developer.email,
        GitHubUsername: developer.gitHubUsername,
        Photo:
          developer.photo && developer.photo.startsWith('data:image/') ? (
            <div className="relative rounded-full overflow-hidden h-10 w-10">
              <Image
                src={developer.photo}
                alt={`Avatar for ${developer.name}`}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          ) : (
            'No photo detected'
          ),
        Bio: developer.bio,
        ContactInformation: developer.contactInformation,
        Location: developer.location,
        SocialMediaLinks: developer.socialMediaLinks,
        Education: developer.education,
        Projects: developer.projects,
        Experiences: developer.experiences,
        Actions: (
          <button
            onClick={() => handleDelete(developer.email)}
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

export default AllDeveloper;
