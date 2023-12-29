import Table from '@/components/Table/Table';

function ProgrammerInterviews() {
  const authState = useContext(AuthContext);

  const columns = [
    { title: 'Avatar', key: 'imageLink' },
    { title: 'Name', key: 'name' },
    { title: 'GitHub', key: 'gitHubLink' },
    { title: 'Role', key: 'role' },
  ];

  if (!authState) {
    redirect('/AdminHome');
  }

  return (
    <div>
      <Table columns={columns} data={companyData} />
    </div>
  );
}

export default ProgrammerInterviews;
