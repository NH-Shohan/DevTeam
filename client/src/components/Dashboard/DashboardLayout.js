import DashboardNavbar from './DashboardNavbar';
import DashboardTopbar from './DashboardTopbar';

export default function DashboardLayout({ children }) {
  return (
    <>
      <div className={`grid grid-cols-12 gap-4 h-screen py-10`}>
        <DashboardNavbar />

        <DashboardTopbar />

        <div className="col-span-9 border bg-secondary border-blue rounded-xl h-[calc(100vh-140px)] w-full p-5 overflow-y-auto overflow-x-hidden scrollbar scrollbar-track-light scrollbar-thumb-gray-light scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-w-[6px]">
          {children}
        </div>
      </div>
    </>
  );
}
