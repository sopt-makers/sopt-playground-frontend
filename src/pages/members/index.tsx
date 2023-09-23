import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import Head from 'next/head';
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
import { ORIGIN } from '@/constants/env';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';

const MemberPage: FC = () => {
  const { data: memberOfMeData } = useGetMemberOfMe();

  const hasProfile = !!memberOfMeData?.hasProfile;
  const onboardingBanner = memberOfMeData && !hasProfile && <StyledOnBoardingBanner name={memberOfMeData.name ?? ''} />;

  return (
    <AuthRequired>
      <Head>
        <meta key='og:title' property='og:title' content='SOPT Playground' />
        <meta key='og:description' property='og:description' content='솝트와 연결되고 싶으신가요?' />
        <meta key='og:image' property='og:image' content={`${ORIGIN}/icons/img/og_playground.jpeg`} />
      </Head>
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
