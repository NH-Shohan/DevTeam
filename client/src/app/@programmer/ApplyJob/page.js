import Table from '@/components/Table/Table';
import { companyData } from '../../../../public/data';

function ApplyJob() {
  const columns = [
    { title: 'Avatar', key: 'imageLink' },
    { title: 'Name', key: 'name' },
    { title: 'GitHub', key: 'gitHubLink' },
    { title: 'Role', key: 'role' },
    { title: 'Role', key: 'role' },
  ];

  return (
    <div>
      <Table columns={columns} data={companyData} />
    </div>
  );
}

export default ApplyJob;
