import styled from '@emotion/styled';
import { FC } from 'react';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import AuthRequired from '@/components/auth/AuthRequired';
import ActiveBannerSlot from '@/components/common/Banner/ActiveBannerSlot';
import Responsive from '@/components/common/Responsive';
import { MemberPageContentLayout } from '@/components/members/common/MemberPageLayout';
import MemberList from '@/components/members/main/MemberList';
import OnBoardingBanner from '@/components/members/main/MemberList/OnBoardingBanner';
import MentoringList from '@/components/mentoring/MentoringList';
import WordChainEntry from '@/components/wordchain/WordchainEntry/WordChainEntry';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';

const MemberPage: FC = () => {
  const { data: memberOfMeData } = useGetMemberOfMe();

  const hasProfile = !!memberOfMeData?.hasProfile;
  const onboardingBanner = memberOfMeData && !hasProfile && <StyledOnBoardingBanner name={memberOfMeData.name ?? ''} />;

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
      <MemberList banner={onboardingBanner} />
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

const StyledOnBoardingBanner = styled(OnBoardingBanner)`
  margin-bottom: 90px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 45px 0;
  }
`;

const HDivider = styled.hr`
  margin-top: 32px;
  border: none;
  background-color: ${colors.black80};
  height: 4px;
`;
