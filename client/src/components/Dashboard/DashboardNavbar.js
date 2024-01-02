'use client';
import useAuthAPI from '@/context/API/AuthAPI';
import { AuthContext } from '@/context/AuthContext';
import Image from 'next/image';
import { useContext } from 'react';
import Routes from '../Routes/Routes';

function DashboardNavbar() {
  const context = useContext(AuthContext);
  const { logoutUser } = useAuthAPI();

  return (
    <div className="p-5 col-span-3 row-span-2 border border-blue rounded-xl flex flex-col items-center relative bg-secondary">
      {context.loggedInUser.photo &&
      context.loggedInUser.photo.startsWith('data:image/') ? (
        <div className="relative rounded-full overflow-hidden">
          <Image
            src={context.loggedInUser.photo}
            alt="User Image"
            width={100}
            height={100}
            priority
          />
        </div>
      ) : (
        <Image
          src={'./user.svg'}
          alt="User Image"
          width={100}
          height={100}
          priority
        />
      )}
      <p className="mt-4 bold">{context.loggedInUser.name}</p>

      <hr className="border border-blue w-full my-7" />

      {context.role === 'admin' ? (
        <>
          <Routes path="/" name={'Create Admin'} />
          <Routes path="/AllAdmin" name={'All Admin'} />
          <Routes path="/AllCompany" name={'All Company'} />
          <Routes path="/AllDeveloper" name={'All Developer'} />
          <Routes path="/Recruiters" name={'All Recruiter'} />
          <Routes path="/CreateRecruiter" name={'Create Recruiter'} />
        </>
      ) : context.role === 'programmer' ? (
        <>
          <Routes path="/" name={'Apply Job'} />
          <Routes path="/AppliedJob" name={'Applied Job'} />
          <Routes path="/Interviews" name={'Interviews'} />
          <Routes path="/PersonalInformation" name={'Personal Information'} />
        </>
      ) : context.role === 'company' ? (
        <>
          <Routes path="/" name={'Create Job'} />
          <Routes path="/ManageJob" name={'Manage Job'} />
          <Routes
            path="/CompanyPersonalInformation"
            name={'Personal Information'}
          />
        </>
      ) : context.role === 'recruiter' ? (
        <>
          <Routes path="/SeeInterviews" name={'See Interviews'} />
          <Routes path="/SetInterview" name={'Set Interview'} />
          <Routes path="/DeveloperStatus" name={'Developer Status'} />
          <Routes
            path="/RecruiterPersonalInformation"
            name={'Personal Information'}
          />
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
