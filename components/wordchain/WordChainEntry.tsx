import styled from '@emotion/styled';
import Link from 'next/link';
import React, { FC } from 'react';

import Text from '@/components/common/Text';
import { playgroundLink } from '@/constants/links';
import IconArrow from '@/public/icons/icon-wordchain-arrow.svg';
import IconWordchainMessage from '@/public/icons/icon-wordchain-message.svg';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface WordChainEntryProps {
  className?: string;
}

const WordChainEntry: FC<WordChainEntryProps> = ({ className }) => {
  return (
    <Container className={className}>
      <LeftSection>
        <TitleWrapper>
          <StyledIconWordchainMessage />
          <StyledTitle>
            현재 {'한유진'}님이 <br />
            끝말잇기를 이기고 있어요!
          </StyledTitle>
        </TitleWrapper>
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

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
    border-radius: 0;
    background-color: ${colors.black100};
    padding: 0 20px;
    width: 100%;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledIconWordchainMessage = styled(IconWordchainMessage)`
  @media ${MOBILE_MEDIA_QUERY} {
    width: 40px;
    height: 40px;
  }
`;

const LeftSection = styled.div`
  width: 100%;
`;

const StyledTitle = styled(Text)`
  display: block;
  margin-top: 8px;
  ${textStyles.SUIT_24_B};

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 0;
    ${textStyles.SUIT_20_B};
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  column-gap: 8px;
  margin-top: 16px;
  ${textStyles.SUIT_16_SB}

  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background-color: ${colors.black90};
    padding: 14px 0;
    width: 100%;

    ${textStyles.SUIT_12_SB}
  }
`;

const RightSection = styled.div``;
