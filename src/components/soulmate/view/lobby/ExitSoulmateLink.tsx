import styled from '@emotion/styled';
import { FC } from 'react';

import SoulmateModal from '@/components/soulmate/view/common/SoulmateModal';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface ExitSoulmateLinkProps {
  onClickStop: () => void;
  onClickKeep: () => void;
}

const ExitSoulmateLink: FC<ExitSoulmateLinkProps> = ({ onClickStop, onClickKeep }) => {
  return (
    <SoulmateModal trigger={<StopSoulmateLink>소울메이트를 그만 이용하고 싶어요</StopSoulmateLink>}>
      <Container>
        <Title>정말 그만 이용하시겠어요?</Title>
        <Description>
          서비스에서 나가면 더이상 새로운 소울메이트와 매칭되지 않아요. 기존 소울메이트와 대화도 불가능해요.
        </Description>
        <ButtonArea>
          <StopButton onClick={onClickStop}>그만 이용할래요</StopButton>
          <KeepButton onClick={onClickKeep}>더 이용해 볼래요</KeepButton>
        </ButtonArea>
      </Container>
    </SoulmateModal>
  );
};

export default ExitSoulmateLink;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StopSoulmateLink = styled.button`
  text-decoration: underline;
  line-height: 100%;
  color: ${colors.gray40};

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_12_M};
  }
`;

const Title = styled.div`
  margin-top: 26px;

  ${textStyles.SUIT_20_B};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_16_B};
  }
`;

const Description = styled.div`
  margin-top: 10px;
  text-align: center;
  line-height: 130%;
  letter-spacing: -0.12px;
  color: ${colors.gray60};

  ${textStyles.SUIT_14_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_12_M};
  }
`;

const ButtonArea = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 20px;
`;

const StopButton = styled.button`
  border-radius: 10px;
  background-color: ${colors.gray10};
  padding: 14px 20px;
  color: ${colors.black80};

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 6px;

    ${textStyles.SUIT_14_M};
  }
`;

const KeepButton = styled.button`
  border-radius: 10px;
  background-color: ${colors.black80};
  padding: 14px 20px;
  line-height: 100%;
  letter-spacing: -0.14px;
  color: ${colors.gray60};

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 6px;

    ${textStyles.SUIT_14_M};
  }
`;
