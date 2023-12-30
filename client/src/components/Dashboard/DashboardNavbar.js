'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import Routes from '../Routes/Routes';
import { AuthContext } from '@/context/AuthContext';
import useAuthAPI from '@/context/API/AuthAPI';

function DashboardNavbar() {
  const context = useContext(AuthContext);
  const { logoutUser } = useAuthAPI();
  return (
    <div className="p-5 col-span-3 row-span-2 border border-blue rounded-xl flex flex-col items-center relative bg-secondary">
      <Image
        className="rounded-full border-gray-light border-2"
        src="/user.svg"
        alt="User Image"
        width={100}
        height={100}
        priority
      />
      <p className="mt-4 bold">Nahim Hossain Shohan</p>

      <hr className="border border-blue w-full my-7" />

      {context.role === 'admin' ? (
        <>
          <Routes path="/" name={'Home'} />
          <Routes path="/CreateAdmin" name={'Create Admin'} />
          <Routes path="/CreateRecruiter" name={'Create Recruiter'} />
          <Routes path="/DeleteCompany" name={'Delete Company'} />
          <Routes path="/DeleteDeveloper" name={'Delete Developer'} />
        </>
      ) : context.role === 'programmer' ? (
        <>
          <Routes path="/" name={'Home'} />
          <Routes path="/ApplyJob" name={'Apply Job'} />
          <Routes path="/Interviews" name={'Interviews'} />
          <Routes path="/ProgrammerMessages" name={'Messages'} />
          <Routes path="/PersonalInformation" name={'Personal Information'} />
        </>
      ) : context.role === 'company' ? (
        <>
          <Routes path="/" name={'Home'} />
          <Routes
            path="/CompanyPersonalInformation"
            name={'Personal Information'}
          />
          <Routes path="/CreateJob" name={'Create Job'} />
          <Routes path="/ManageJob" name={'Manage Job'} />
          <Routes path="/AvailableJobs" name={'Available Jobs'} />
        </>
      ) : context.role === 'recruiter' ? (
        <>
          <Routes path="/" name={'Home'} />
          <Routes
            path="/RecruiterPersonalInformation"
            name={'Personal Information'}
          />
          <Routes path="/SeeInterviews" name={'See Interviews'} />
          <Routes path="/SetInterview" name={'Set Interview'} />
          <Routes path="/ViewMessages" name={'View Messages'} />
          <Routes path="/DeveloperStatus" name={'Developer Status'} />
        </>
      ) : null}

      <div className="absolute bottom-0 w-full p-5">
        <span className="w-full">
          <button
            onClick={logoutUser}
            className={`hover:bg-red-light text-red bold w-full py-4 rounded-lg text-left pl-4 transition-all`}
          >
            Logout
          </button>
        </span>
      </div>
    </div>
  );
}

export default DashboardNavbar;
