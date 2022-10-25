import AuthRequired from '@/components/auth/AuthRequired';
import Header from '@/components/common/Header';
import { setLayout } from '@/utils/layout';

export default function MembersUploadPage() {
  return (
    <AuthRequired>
      <div></div>
    </AuthRequired>
  );
}

setLayout(MembersUploadPage, (page) => (
  <>
    <Header />
    {page}
  </>
));
