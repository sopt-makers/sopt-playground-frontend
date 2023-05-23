import styled from '@emotion/styled';
import { FC } from 'react';

import { useGetMemberOfMe } from '@/api/endpoint_LEGACY/hooks';
import AuthRequired from '@/components/auth/AuthRequired';
import SOPTKATONBanner from '@/components/common/Banner/SOPTKATONBanner';
import MemberList from '@/components/members/main/MemberList';
import OnBoardingBanner from '@/components/members/main/MemberList/OnBoardingBanner';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';

const UserPage: FC = () => {
  const { data: memberOfMeData } = useGetMemberOfMe();

  const hasProfile = !!memberOfMeData?.hasProfile;
  const onboardingBanner = memberOfMeData && !hasProfile && <StyledOnBoardingBanner name={memberOfMeData.name ?? ''} />;

  return (
    <AuthRequired>
      <SOPTKATONBanner />
      <MemberList banner={onboardingBanner} />
    </AuthRequired>
  );
};

setLayout(UserPage, 'headerFooter');

export default UserPage;

const StyledOnBoardingBanner = styled(OnBoardingBanner)`
  margin: 120px 0 90px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 45px 0;
  }
`;
