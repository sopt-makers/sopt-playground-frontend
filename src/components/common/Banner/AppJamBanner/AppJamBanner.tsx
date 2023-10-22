import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import Head from 'next/head';
import React, { FC } from 'react';

import BannerLeft from '@/components/common/Banner/AppJamBanner/assets/banner-left.svg';
import BannerRight from '@/components/common/Banner/AppJamBanner/assets/banner-right.svg';
import BannerRightMobile from '@/components/common/Banner/AppJamBanner/assets/mobile-banner-right.svg';
import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const APPJAM_LINK = 'https://www.notion.so/go-sopt/APP-JAM-0303e38562074483bfa9893d7df23147';

const AppJamBanner: FC = () => {
  return (
    <>
      <Head>
        <link
          rel='preload'
          href='https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2212@1.0/KIMM_Bold.woff2'
          as='font'
          type='font/woff2'
          crossOrigin=''
        />
      </Head>
      <Responsive only='desktop'>
        <StyledBanner>
          <LeftImage />
          <RightImage />
          <TextWrapper>
            <Text typography='SUIT_24_B'>
              🗯&nbsp;
              <StyledSOPT>GO SOPT</StyledSOPT> 기획 자료를 공개합니다&nbsp;🗯
            </Text>
            <StyledLink href={APPJAM_LINK} target='_blank' rel='noopener noreferrer'>{`바로 보기 >`}</StyledLink>
          </TextWrapper>
        </StyledBanner>
      </Responsive>
      <Responsive only='mobile'>
        <a href={APPJAM_LINK} target='_blank' rel='noopener noreferrer'>
          <StyledBanner>
            <MobileRightImage />
            <Text typography='SUIT_15_B'>
              🗯&nbsp;
              <StyledSOPT>GO SOPT</StyledSOPT> 기획 자료 공개&nbsp;🗯
            </Text>
          </StyledBanner>
        </a>
      </Responsive>
    </>
  );
};

export default AppJamBanner;

const StyledBanner = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: ${colors.gray900};
  padding: 20px 0;
  width: 100%;
  height: 96px;

  @media ${MOBILE_MEDIA_QUERY} {
    justify-content: flex-start;
    padding: 15px 20px;
    height: 48px;
  }
`;

const LeftImage = styled(BannerLeft)`
  position: absolute;
  top: 0;
  left: 0;
`;

const RightImage = styled(BannerRight)`
  position: absolute;
  top: 0;
  right: 0;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

const StyledSOPT = styled.span`
  @font-face {
    font-family: 'KIMM_Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2212@1.0/KIMM_Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
  font-family: 'KIMM_Bold';
`;

const StyledLink = styled.a`
  line-height: 19px;
  color: #d2d2d2;
  font-size: 16px;
  font-weight: 500;
`;

const MobileRightImage = styled(BannerRightMobile)`
  position: absolute;
  top: 0;
  right: 0;
`;
