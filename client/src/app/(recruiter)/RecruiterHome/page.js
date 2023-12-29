import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import Table from '@/components/Table/Table';

function RecruiterHome() {
  const columns = [
    { title: 'Avatar', key: 'imageLink' },
    { title: 'Name', key: 'name' },
    { title: 'GitHub', key: 'gitHubLink' },
    { title: 'Role', key: 'role' },
  ];
  return (
    <section className="container mx-auto">
      <DashboardLayout>
        <Table columns={columns} data={companyData} />
      </DashboardLayout>
    </section>
  );
}

export default RecruiterHome;
