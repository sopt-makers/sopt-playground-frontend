import styled from '@emotion/styled';
import MakersLogoCircle from 'public/logos/logo-makers-circle.svg';

import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface StartWordChatMessageProps {
  word: string;
}

export default function StartWordChatMessage({ word }: StartWordChatMessageProps) {
  return (
    <Container>
      <Makers.Container>
        <Makers.Logo />
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
`;

const Makers = {
  Logo: MakersLogoCircle,
  Title: styled.div`
    line-height: 100%;
    color: ${colors.white};

    ${textStyles.SUIT_20_SB}
  `,
  Container: styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
  `,
};

const StartWord = styled.div`
  position: relative;
  margin-left: 76px;
  border-radius: 20px;
  background-color: ${colors.black90};
  padding: 16px 20px;
  width: fit-content;
  line-height: 120%;
  color: ${colors.white};

  ${textStyles.SUIT_16_M}
`;

const Triangle = styled.div`
  position: absolute;
  top: -9px;
  left: 12px;
  border-right: 32px solid transparent;
  border-bottom: 27px solid ${colors.black90};
  border-left: 0 solid transparent;
  width: 0;
  height: 0;
`;
