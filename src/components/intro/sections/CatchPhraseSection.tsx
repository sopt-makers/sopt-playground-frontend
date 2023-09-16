import styled from '@emotion/styled';
import { FC } from 'react';

import Typer from '@/components/intro/sections/Typer';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface CatchPhraseSectionProps {}

const CatchPhraseSection: FC<CatchPhraseSectionProps> = ({}) => {
  return (
    <Container>
      <PlaygroundChip>SOPT Playground</PlaygroundChip>
      <PhraseBox>
        <div>SOPT 구성원들과</div>
        <Typer
          sequence={[
            [{ text: '연결', style: { color: '#5DDBFF' } }, { text: '되는 공간' }],
            [{ text: '기회', style: { color: '#FDBBF9' } }, { text: '를 공유하는 공간' }],
            [{ text: '즐거움', style: { color: '#FFCA00' } }, { text: '을 느끼는 공간' }],
          ]}
          span={{
            fill: 1000,
            full: 1000,
            erase: 500,
            empty: 300,
          }}
        />
      </PhraseBox>
    </Container>
  );
};

export default CatchPhraseSection;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlaygroundChip = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.gray80};
  border-radius: 68px;
  padding: 10px;

  ${textStyles.SUIT_16_B};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_12_B};
  }
`;

const PhraseBox = styled.div`
  margin-top: 17px;
  text-align: center;
  line-height: 120%; /* 72px */
  letter-spacing: -1.2px;

  ${textStyles.SUIT_60_M};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 15px;

    ${textStyles.SUIT_32_M}
  }
`;
