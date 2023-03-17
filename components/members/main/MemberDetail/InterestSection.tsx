import styled from '@emotion/styled';
import React, { FC } from 'react';

import Text from '@/components/common/Text';
import InfoItem from '@/components/members/detail/InfoItem';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const getBalanceGameResults = (balanceGame: BalanceGame): string[] => {
  const balanceGameOptions = {
    isPourSauceLover: ['부먹', '찍먹'],
    isHardPeachLover: ['딱복', '물복'],
    isMintChocoLover: ['민초', '반민초'],
    isRedBeanFishBreadLover: ['팥붕', '슈붕'],
    isSojuLover: ['소주', '맥주'],
    isRiceTteokLover: ['쌀떡', '밀떡'],
  };

  return Object.entries(balanceGameOptions)
    .map(([key, [yesOption, noOption]]) =>
      balanceGame[key as keyof BalanceGame] === null
        ? undefined
        : balanceGame[key as keyof BalanceGame]
        ? yesOption
        : noOption,
    )
    .filter((result) => result !== undefined) as string[];
};

type BalanceGame = {
  isPourSauceLover: boolean | null;
  isHardPeachLover: boolean | null;
  isMintChocoLover: boolean | null;
  isRedBeanFishBreadLover: boolean | null;
  isSojuLover: boolean | null;
  isRiceTteokLover: boolean | null;
};

interface InterestSectionProps {
  mbti: {
    name: string;
    description: string;
  };
  sojuCapacity: number;
  interest: string;
  balanceGame: BalanceGame;
  idealType: string;
  selfIntroduction: string;
}
const InterestSection: FC<InterestSectionProps> = ({
  mbti,
  sojuCapacity,
  balanceGame,
  idealType,
  interest,
  selfIntroduction,
}) => {
  const balanceGameResults = getBalanceGameResults(balanceGame);

  return (
    <StyledInterestSection>
      <InfoItem label='MBTI + 제 성격은요...'>
        <MBTI>{mbti.name}</MBTI>
        <MBTIDescription>{mbti.description}</MBTIDescription>
      </InfoItem>
      <InfoItem label='소주, 어디까지 마셔봤니?'>
        <Description>{`${sojuCapacity}병`}</Description>
      </InfoItem>
      <InfoItem label='저는 요새 이런 걸 좋아해요!'>
        <Description>{interest}</Description>
      </InfoItem>
      <InfoItem label='나는 어느 쪽?'>
        <BalanceGame>
          {balanceGameResults.map((balanceGameResult, index) => (
            <React.Fragment key={index}>
              {balanceGameResult}
              {index !== balanceGameResults.length - 1 && <VerticalLine />}
            </React.Fragment>
          ))}
        </BalanceGame>
      </InfoItem>
      <InfoItem label='나의 이상형은? 😏'>
        <Description>{idealType}</Description>
      </InfoItem>
      <InfoItem label='자유로운 자기소개'>
        <Description>{selfIntroduction}</Description>
      </InfoItem>
    </StyledInterestSection>
  );
};

export default InterestSection;

const StyledInterestSection = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 35px;
`;

const MBTI = styled(Text)`
  display: block;
  margin-top: 16px;
  ${textStyles.SUIT_18_B};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 12px;
    ${textStyles.SUIT_16_B};
  }
`;

const MBTIDescription = styled(Text)`
  display: block;
  margin-top: 10px;
  ${textStyles.SUIT_18_M};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 6px;
    ${textStyles.SUIT_16_M};
  }
`;

const Description = styled(Text)`
  margin-top: 16px;
  ${textStyles.SUIT_18_M};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 12px;
    ${textStyles.SUIT_16_M};
  }
`;

const BalanceGame = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
  margin-top: 16px;
  ${textStyles.SUIT_18_M};

  @media ${MOBILE_MEDIA_QUERY} {
    column-gap: 12px;
    margin-top: 12px;
    ${textStyles.SUIT_16_M};
  }
`;

const VerticalLine = styled.div`
  background-color: ${colors.gray100};
  width: 1.5px;
  height: 14px;

  @media ${MOBILE_MEDIA_QUERY} {
    height: 12px;
  }
`;
