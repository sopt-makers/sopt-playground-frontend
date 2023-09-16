import styled from '@emotion/styled';

import { legacyColors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface StartWordChatMessageProps {
  word: string;
}

export default function StartWordChatMessage({ word }: StartWordChatMessageProps) {
  return (
    <Container>
      <Makers.Container>
        <Makers.Logo src={'/logos/img/logo-makers-circle.png'} alt='makers-logo' />
        <Makers.Title>sopt makers</Makers.Title>
      </Makers.Container>
      <StartWord>
        {word}
        <Triangle />
      </StartWord>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 18px;
  }
`;

const Makers = {
  Logo: styled.img`
    width: 60px;
    height: 60px;

    @media ${MOBILE_MEDIA_QUERY} {
      width: 30px;
      height: 30px;
    }
  `,
  Title: styled.div`
    line-height: 100%;
    color: ${legacyColors.white};

    ${textStyles.SUIT_20_SB}

    @media ${MOBILE_MEDIA_QUERY} {
      ${textStyles.SUIT_14_SB}
    }
  `,
  Container: styled.div`
    display: flex;
    gap: 16px;
    align-items: center;

    @media ${MOBILE_MEDIA_QUERY} {
      gap: 10px;
    }
  `,
};

const StartWord = styled.div`
  position: relative;
  margin-left: 76px;
  border-radius: 20px;
  background-color: ${legacyColors.black90};
  padding: 16px 20px;
  width: fit-content;
  line-height: 120%;
  color: ${legacyColors.white};

  ${textStyles.SUIT_16_M}

  @media ${MOBILE_MEDIA_QUERY} {
    margin-left: 0;
    border-radius: 10px;
    padding: 10px 16px;

    ${textStyles.SUIT_12_M}
  }
`;

const Triangle = styled.div`
  position: absolute;
  top: -9px;
  left: 12px;
  border-right: 32px solid transparent;
  border-bottom: 27px solid ${legacyColors.black90};
  border-left: 0 solid transparent;
  width: 0;
  height: 0;

  @media ${MOBILE_MEDIA_QUERY} {
    left: 8px;
    border-right-width: 15px;
    border-bottom-width: 13px;
  }
`;
