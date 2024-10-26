import styled from '@emotion/styled';
import { FC } from 'react';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import AuthRequired from '@/components/auth/AuthRequired';
import CoffeeChatList from '@/components/coffeechat/CoffeeRecentChatList';
import MemberList from '@/components/members/main/MemberList';
import OnBoardingBanner from '@/components/members/main/MemberList/OnBoardingBanner';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';

const MemberPage: FC = () => {
  const { data: memberOfMeData } = useGetMemberOfMe();

  const hasProfile = !!memberOfMeData?.hasProfile;
  const onboardingBanner = memberOfMeData && !hasProfile && <StyledOnBoardingBanner name={memberOfMeData.name ?? ''} />;

  return (
    <AuthRequired>
      <CoffeeChatList />
      <MemberList banner={onboardingBanner} />
    </AuthRequired>
  );
};

setLayout(MemberPage, 'headerFooter');

export default MemberPage;

const StyledOnBoardingBanner = styled(OnBoardingBanner)`
  margin-bottom: 90px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 45px 0;
  }
`;
