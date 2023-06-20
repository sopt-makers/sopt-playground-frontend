import styled from '@emotion/styled';
import Link from 'next/link';
import React, { FC } from 'react';

import Text from '@/components/common/Text';
import { playgroundLink } from '@/constants/links';
import IconArrow from '@/public/icons/icon-wordchain-arrow.svg';
import IconWordchainMessage from '@/public/icons/icon-wordchain-message.svg';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface WordChainEntryProps {
  className?: string;
}

const WordChainEntry: FC<WordChainEntryProps> = ({ className }) => {
  return (
    <Container className={className}>
      <LeftSection>
        <IconWordchainMessage />
        <StyledTitle typography='SUIT_24_B'>
          현재 {'한유진'}님이 <br />
          끝말잇기를 이기고 있어요!
        </StyledTitle>
        <StyledLink href={playgroundLink.wordchain()}>
          SOPT 회원들과 끝말잇기 하러 가기
          <IconArrow />
        </StyledLink>
      </LeftSection>
      <RightSection></RightSection>
    </Container>
  );
};

export default WordChainEntry;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 16px;
  background-color: ${colors.black90};
  padding: 39px 45px 39px 70px;
  width: 100%;
`;

const LeftSection = styled.div``;

const StyledTitle = styled(Text)`
  display: block;
  margin-top: 8px;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  column-gap: 8px;
  margin-top: 16px;
  ${textStyles.SUIT_16_SB}
`;

const RightSection = styled.div``;
