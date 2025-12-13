import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC } from 'react';

import Text from '@/components/common/Text';
import MemberDetailSection from '@/components/members/detail/ActivitySection/MemberDetailSection';
import InfoItem from '@/components/members/detail/InfoItem';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const getBalanceGameResults = (balanceGame: BalanceGame): string[] | null => {
  if (balanceGame === null) return null;

  const BALANCE_GAME_OPTIONS = {
    isPourSauceLover: ['부먹', '찍먹'],
    isHardPeachLover: ['딱복', '물복'],
    isMintChocoLover: ['민초', '반민초'],
    isRedBeanFishBreadLover: ['팥붕', '슈붕'],
    isSojuLover: ['소주', '맥주'],
    isRiceTteokLover: ['쌀떡', '밀떡'],
  };

  return Object.entries(BALANCE_GAME_OPTIONS)
    .map(([key, [yesOption, noOption]]) => {
      if (balanceGame[key as keyof BalanceGame] === null) {
        return undefined;
      }
      return balanceGame[key as keyof BalanceGame] ? yesOption : noOption;
    })
    .filter((result) => result !== undefined) as string[];
};

const getSojuCapacityLabel = (sojuCapacity: number): string => {
  if (sojuCapacity === 0) {
    return '못마셔요';
  }
  if (sojuCapacity === 3) {
    return '3병 이상';
  }
  return `${sojuCapacity}병`;
};

type BalanceGame = {
  isPourSauceLover: boolean | null;
  isHardPeachLover: boolean | null;
  isMintChocoLover: boolean | null;
  isRedBeanFishBreadLover: boolean | null;
  isSojuLover: boolean | null;
  isRiceTteokLover: boolean | null;
} | null;

type WorkPreference = {
  ideationStyle: string;
  workTime: string;
  communicationStyle: string;
  workPlace: string;
  feedbackStyle: string;
} | null;

interface InterestSectionProps {
  mbti: {
    name?: string;
    description?: string;
  };
  sojuCapacity?: number;
  interest?: string;
  workPreference?: WorkPreference;
  balanceGame: BalanceGame;
  selfIntroduction?: string;
}
const InterestSection: FC<InterestSectionProps> = ({
  mbti,
  sojuCapacity,
  balanceGame,
  interest,
  workPreference,
  selfIntroduction,
}) => {
  const balanceGameResults = getBalanceGameResults(balanceGame);
  const isBalanceGameAvailable = balanceGame && Object.values(balanceGame).some((value) => value !== null);
  const isWorkPreferenceAvailable = workPreference && Object.values(workPreference).some((value) => value !== null);

  return (
    <StyledMemberDetailSection>
      {mbti.name && (
        <InfoItem label='MBTI + 제 성격은요...'>
          <MBTI>{mbti.name}</MBTI>
          <MBTIDescription>{mbti.description ?? ''}</MBTIDescription>
        </InfoItem>
      )}
      {sojuCapacity !== undefined && sojuCapacity !== null && (
        <InfoItem label='소주, 어디까지 마셔봤니?'>
          <Description>{getSojuCapacityLabel(sojuCapacity)}</Description>
        </InfoItem>
      )}
      {interest && (
        <InfoItem label='저는 요새 이런 걸 좋아해요!'>
          <Description>{interest}</Description>
        </InfoItem>
      )}
      {isWorkPreferenceAvailable && (
        <InfoItem label='이렇게 일하는 걸 선호해요!'>
          <BalanceGameWrapper>
            {workPreference?.ideationStyle && <BalanceGameItem>{workPreference.ideationStyle}</BalanceGameItem>}
            {workPreference?.workTime && <BalanceGameItem>{workPreference.workTime}</BalanceGameItem>}
            {workPreference?.communicationStyle && (
              <BalanceGameItem>{workPreference.communicationStyle}</BalanceGameItem>
            )}
            {workPreference?.workPlace && <BalanceGameItem>{workPreference.workPlace}</BalanceGameItem>}
            {workPreference?.feedbackStyle && <BalanceGameItem>{workPreference.feedbackStyle}</BalanceGameItem>}
          </BalanceGameWrapper>
        </InfoItem>
      )}
      {isBalanceGameAvailable && (
        <InfoItem label='나는 어느 쪽?'>
          <BalanceGameWrapper>
            {balanceGameResults?.map((balanceGameResult, index) => (
              <BalanceGameItem key={index}>{balanceGameResult}</BalanceGameItem>
            ))}
          </BalanceGameWrapper>
        </InfoItem>
      )}
      {selfIntroduction && (
        <InfoItem label='자유로운 자기소개'>
          <SelfIntroductionDescription>{selfIntroduction}</SelfIntroductionDescription>
        </InfoItem>
      )}
    </StyledMemberDetailSection>
  );
};

export default InterestSection;

const StyledMemberDetailSection = styled(MemberDetailSection)`
  row-gap: 35px;
`;

const StyledText = styled(Text)`
  line-height: 160%;
  @media ${MOBILE_MEDIA_QUERY} {
    line-height: 140%;
  }
`;

const MBTI = styled(StyledText)`
  display: block;
  margin-top: 16px;
  ${textStyles.SUIT_18_B};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 12px;
    ${textStyles.SUIT_16_B};
  }
`;

const MBTIDescription = styled(StyledText)`
  display: block;
  margin-top: 10px;
  white-space: pre-line;

  ${textStyles.SUIT_18_M};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 6px;
    ${textStyles.SUIT_16_M};
  }
`;

const Description = styled(StyledText)`
  margin-top: 16px;
  ${textStyles.SUIT_18_M};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 12px;
    ${textStyles.SUIT_16_M};
  }
`;

const SelfIntroductionDescription = styled(Description)`
  white-space: pre-line;
`;

const BalanceGameWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-top: 16px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 12px;
    max-width: 265px;
  }
`;

const BalanceGameItem = styled.div`
  border-radius: 13px;
  background-color: ${colors.gray700};
  padding: 6px 14px;
  line-height: 16px;
  color: ${colors.gray10};

  ${textStyles.SUIT_16_SB};
`;
