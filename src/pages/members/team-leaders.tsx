import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Button } from '@sopt-makers/ui';
import { Chip } from '@sopt-makers/ui';
import { useState } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import Text from '@/components/common/Text';
import { DESKTOP_ONE_MEDIA_QUERY } from '@/components/members/main/contants';
import { DESKTOP_TWO_MEDIA_QUERY } from '@/components/members/main/contants';
import TeamLeaderCard from '@/components/members/main/TeamLeaderCard';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';
type SelectedPart = 'APP' | 'WEB';
const cardComponentWidth = 316;

const TeamLeadersPage = () => {
  const [selectedPart, setSelectedPart] = useState<SelectedPart>('APP');
  return (
    <AuthRequired>
      <StyledContainer>
        <StyledMain>
          <TitleWrapper>
            <Text typography='SUIT_32_B'>37기 앱잼 TL 후보를 만나보세요🔥</Text>
            <Text typography='SUIT_18_M' color={colors.gray200}>
              정렬 순서는 접속할 때마다 무작위로 바뀌어요.
            </Text>
          </TitleWrapper>
          <ChipWrapper>
            <Chip active={selectedPart === 'APP'} onClick={() => setSelectedPart('APP')}>
              APP
            </Chip>
            <Chip active={selectedPart === 'WEB'} onClick={() => setSelectedPart('WEB')}>
              WEB
            </Chip>
          </ChipWrapper>

          <TeamLeaderCardsWrapper>
            <TeamLeaderCard
              name='김철수'
              university='서울대학교'
              activities={[
                {
                  id: 363,
                  generation: 32,
                  part: '웹',
                  team: '미디어팀',
                },
                {
                  id: 364,
                  generation: 33,
                  part: '서버',
                  team: '서버 파트장',
                },
                {
                  id: 365,
                  generation: 37,
                  part: '기획',
                  team: '총무',
                },
              ]}
              introduction='안녕하세요. 김철수입니다. 저는 서울대학교 컴퓨터공학과 졸업생이고, 현재 메이커스 30기 미디어팀 팀장을 맡고 있습니다.'
            />
            <TeamLeaderCard
              name='김철수'
              university='서울대학교'
              activities={[
                {
                  id: 363,
                  generation: 30,
                  part: 'iOS',
                  team: '미디어팀',
                },
                {
                  id: 364,
                  generation: 31,
                  part: '서버',
                  team: '서버 파트장',
                },
                {
                  id: 365,
                  generation: 37,
                  part: '기획',
                  team: '총무',
                },
                {
                  id: 366,
                  generation: 32,
                  part: '웹',
                },
                {
                  id: 367,
                  generation: 33,
                  part: '서버',
                },
                {
                  id: 368,
                  generation: 29,
                  part: '기획',
                },
              ]}
              introduction='안녕하세요. 김철수입니다. 저는 서울대학교 컴퓨터공학과 졸업생이고, 현재 메이커스 30기 미디어팀 팀장을 맡고 있습니다.'
            />
          </TeamLeaderCardsWrapper>
        </StyledMain>
      </StyledContainer>
    </AuthRequired>
  );
};
setLayout(TeamLeadersPage, 'headerFooter');

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledMain = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  width: fit-content;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 20px;
    padding: 20px;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 49px;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 0;
  }
`;

const ChipWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: start;
  margin-top: 40px;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 0;
  }
`;

const TeamLeaderCardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(10px, ${cardComponentWidth}px));
  gap: 32px 16px;
  align-items: center;
  justify-items: stretch;
  margin-top: 36px;

  @media ${DESKTOP_ONE_MEDIA_QUERY} {
    grid-template-columns: repeat(3, minmax(10px, ${cardComponentWidth}px));
  }

  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    grid-template-columns: repeat(2, minmax(10px, ${cardComponentWidth}px));
  }

  @media ${MOBILE_MEDIA_QUERY} {
    grid-template-columns: repeat(1, 1fr);
    gap: 16px 8px;
    justify-items: stretch;
    margin-top: 0;
    width: 100%;
  }
`;

export default TeamLeadersPage;
