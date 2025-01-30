import AuthRequired from '@/components/auth/AuthRequired';
import MySoptReport from '@/components/mySoptReport';
import { setLayout } from '@/utils/layout';

const MySoptReportPage = () => {
  return (
    <AuthRequired>
      <MySoptReport />;
    </AuthRequired>
  );
};
setLayout(MySoptReportPage, 'header');

export default MySoptReportPage;
