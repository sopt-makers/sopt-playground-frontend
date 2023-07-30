import styled from '@emotion/styled';
import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import ActiveBannerSlot from '@/components/common/Banner/ActiveBannerSlot';
import Responsive from '@/components/common/Responsive';
import { MemberPageContentLayout } from '@/components/members/common/MemberPageLayout';
import MemberList from '@/components/members/main/MemberList';
import MentoringList from '@/components/mentoring/MentoringList';
import WordChainEntry from '@/components/wordchain/WordchainEntry/WordChainEntry';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';

const MemberPage: FC = () => {
  return (
    <AuthRequired>
      <ActiveBannerSlot />
      <MemberPageContentLayout>
        <StyledWordChainEntry />
      </MemberPageContentLayout>
      <Responsive only='mobile'>
        <HDivider />
      </Responsive>
      <MentoringList />
      <MemberList banner={<></>} />
    </AuthRequired>
  );
};

setLayout(MemberPage, 'headerFooter');

export default MemberPage;

const StyledWordChainEntry = styled(WordChainEntry)`
  margin-top: 106px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 16px;
  }
`;

const HDivider = styled.hr`
  margin-top: 32px;
  border: none;
  background-color: ${colors.black80};
  height: 4px;
`;
