import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';

import SoulmateIcon from '@/components/soulmate/icons/SoulmateIcon';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface LobbyLayoutProps {
  name: string;
  statusSlot: ReactNode;
  exitSoulmateSlot: ReactNode;
}

const LobbyLayout: FC<LobbyLayoutProps> = ({ name, statusSlot, exitSoulmateSlot }) => {
  return (
    <Container>
      <Title>
        <StyledSoulmateIcon />
        {name}님의 소울메이트
      </Title>

      {statusSlot}
      {exitSoulmateSlot}
    </Container>
  );
};

export default LobbyLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 20px;
  }
`;

const Title = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  ${textStyles.SUIT_40_B};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_20_B};
  }
`;

const StyledSoulmateIcon = styled(SoulmateIcon)`
  width: 55px;
  height: 55px;
`;
