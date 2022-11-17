import styled from '@emotion/styled';
import { FC } from 'react';

import Notifier from '@/components/makers/Notifier';
import { textStyles } from '@/styles/typography';

const AboutMakers: FC = () => {
  return (
    <StyledAbout>
      <MakersLogoBox>
        <StyledLogo src='/logos/logo-full.svg' alt='makers-logo' />
      </MakersLogoBox>
      <Intro>
        sopt makers는 SOPT 구성원들이 가진 불편함을 제품을 통해 해결하여, 2000여명의 구성원들에게 더 많은 가치를
        연결하기 위해 신설된 특수 기구에요.
      </Intro>
      <StyledNotifier />
    </StyledAbout>
  );
};

export default AboutMakers;

const StyledAbout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  max-width: 800px;
`;

const MakersLogoBox = styled.div``;

const StyledLogo = styled.img`
  width: 470px;
`;

const Intro = styled.div`
  ${textStyles.SUIT_28_M}

  margin-top: 80px;
`;

const StyledNotifier = styled(Notifier)`
  margin-top: 80px;
`;
