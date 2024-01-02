'use client';

// Import necessary modules and components
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';
import { AlertToast } from '@/components/Toast/AlertToast';

const CreateJob = () => {
  const context = useContext(AuthContext);
  const { loggedInUser } = context;
  // Define state variables
  const [recruiters, setRecruiters] = useState([]);
  const [jobData, setJobData] = useState({
    jobDescription: '',
    jobRole: '',
    jobSeat: 0,
    jobExpireDate: '',
    joiningDate: '',
    requiredSkills: [],
    interviewer: '',
    company_email: loggedInUser.email,
  });

  // Fetch recruiters data on component mount
  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3333/recruiter/get-recruiters',
        );
        setRecruiters(response.data);
      } catch (error) {
        console.error('Error fetching recruiters:', error.response || error);
      }
    };

    fetchRecruiters();
  }, []); // Removed [recruiters] to prevent infinite loop

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle skills changes
  const handleSkillsChange = (selectedSkills) => {
    setJobData((prevData) => ({ ...prevData, requiredSkills: selectedSkills }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API call to create job
      await axios.post('http://localhost:3333/company/create-job', {
        ...jobData,
        jobSeat: Number.parseInt(jobData.jobSeat),
      });

      // Optionally, you can display a success message or redirect to another page

      // Clear form after successful submission
      setJobData({
        jobDescription: '',
        jobRole: '',
        jobSeat: 0,
        jobExpireDate: '',
        joiningDate: '',
        requiredSkills: [],
        interviewer: '',
        company_email: '', // Will be set to loggedInUser.email
      });
      AlertToast('success');
    } catch (error) {
      console.error('Error creating job:', error.response || error);
      AlertToast(error);
      // Handle error as needed
    }
  };

  return (
    <div className="container">
      <h2 className="title">Create Job</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          Job Description:
          <input
            type="text"
            name="jobDescription"
            value={jobData.jobDescription}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
            required
          />
        </label>
        <br />

        <label className="label">
          Job Role:
          <input
            type="text"
            name="jobRole"
            value={jobData.jobRole}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
            required
          />
        </label>
        <br />

        <label className="label">
          Job Seat:
          <input
            type="number"
            name="jobSeat"
            value={jobData.jobSeat}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
            required
          />
        </label>
        <br />

        <label className="label">
          Job Expire Date:
          <input
            type="date"
            name="jobExpireDate"
            value={jobData.jobExpireDate}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
            required
          />
        </label>
        <br />

        <label className="label">
          Joining Date:
          <input
            type="date"
            name="joiningDate"
            value={jobData.joiningDate}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
            required
          />
        </label>
        <br />

        {/* Add your custom select component for skills here */}
        {/* Example: <SelectSkills onChange={handleSkillsChange} /> */}
        <label className="label">
          Required Skills: {'(To select multiple Use Ctrl + select)'}
          <SelectSkills
            selectedSkills={jobData.requiredSkills}
            onChange={handleSkillsChange}
          />
        </label>
        <br />

        <label className="label">
          Interviewer:
          <select
            name="interviewer"
            value={jobData.interviewer}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
            required
          >
            <option value="" disabled>
              Select an interviewer
            </option>
            {recruiters.map((recruiter) => (
              <option key={recruiter.id} value={recruiter.email}>
                {recruiter.email}
              </option>
            ))}
          </select>
        </label>
        <br />

        <button
          type="submit"
          className="border border-blue py-3 px-8 rounded-lg bg-blue hover:bg-[#3333bd99] transition-all text-white flex justify-center items-center w-1/4"
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default CreateJob;

const SelectSkills = ({ selectedSkills, onChange }) => {
  // const [skills, setSkills] = useState([]);
  const skills = [
    'Algorithm Design',
    'Data Structures',
    'Problem Solving',
    'Object-Oriented Programming',
    'Functional Programming',
    'Database Management',
    'SQL',
    'NoSQL',
    'Big Data Technologies',
    'Parallel Programming',
    'Multithreading',
    'Concurrency',
    'Version Control (e.g., Git)',
    'Software Development Life Cycle (SDLC)',
    'Agile Methodologies',
    'Test-Driven Development (TDD)',
    'Continuous Integration/Continuous Deployment (CI/CD)',
    'Web Development',
    'Backend Development',
    'Frontend Development',
    'Full-Stack Development',
    'RESTful APIs',
    'GraphQL',
    'Web Security',
    'Responsive Design',
    'Mobile App Development',
    'Cross-Platform Development',
    'iOS Development',
    'Android Development',
    'Cloud Computing',
    'Amazon Web Services (AWS)',
    'Microsoft Azure',
    'Google Cloud Platform (GCP)',
    'Containerization (e.g., Docker)',
    'Orchestration (e.g., Kubernetes)',
    'Microservices Architecture',
    'Serverless Computing',
    'Networking',
    'Operating Systems',
    'Linux/Unix',
    'Windows',
    'Shell Scripting',
    'Scripting Languages (e.g., Python, Ruby)',
    'DevOps Principles',
    'Infrastructure as Code (IaC)',
    'Machine Learning',
    'Natural Language Processing (NLP)',
    'Computer Vision',
    'Blockchain Development',
    'Cybersecurity',
    'Code Review',
    'Debugging',
  ];

  // // Fetch skills data on component mount
  // useEffect(() => {
  //   const fetchSkills = async () => {
  //     try {
  //       const response = await axios.get(
  //         'http://localhost:3333/skills/get-skills',
  //       );
  //       setSkills(response.data);
  //     } catch (error) {
  //       console.error('Error fetching skills:', error.response || error);
  //     }
  //   };

  //   fetchSkills();
  // }, []); // Run only on mount

  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );
    onChange(selectedOptions);
  };

  return (
    <select
      multiple
      name="requiredSkills"
      value={selectedSkills}
      onChange={handleSelectChange}
      className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
      required
    >
      {skills.map((skill, index) => (
        <option key={index} value={skill}>
          {skill}
        </option>
      ))}
    </select>
  );
};
