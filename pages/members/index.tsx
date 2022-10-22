import { FC } from 'react';

import Header from '@/components/common/Header';
import { setLayout } from '@/utils/layout';

const MemberPage: FC = () => {
  return <>멤버 페이지</>;
};

setLayout(MemberPage, (page) => (
  <>
    <Header />
    {page}
  </>
));

export default MemberPage;
