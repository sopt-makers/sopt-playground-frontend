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
import { useGetTLMember } from '@/api/endpoint/members/getTeamLeaderMember';
import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
const cardComponentWidth = 316;

const TeamLeadersPage = () => {
  const { data: memberOfMeData } = useGetMemberOfMe();
  const isAppJamParticipant = memberOfMeData?.enableWorkPreferenceEvent;

  const { data: tlMemberList } = useGetTLMember(!!isAppJamParticipant);
  const [selectedPart, setSelectedPart] = useState<SelectedPart>('APP');

  if (!isAppJamParticipant) {
    return (
      <div
        style={{
          width: '100%',
          height: '90vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        앱잼 참여자만 확인 가능한 페이지입니다.
      </div>
    );
  }
  return (
    <AuthRequired>
      <StyledContainer>
        <StyledMain>
          <TitleWrapper>
            <Text typography='SUIT_32_B'>37기 앱잼 TL을 만나보세요🔥</Text>
            <Text typography='SUIT_18_M' color={colors.gray200}>
              정렬 순서는 이름 기준 가나다 순이에요.
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
            {tlMemberList
              ?.filter((tlMember) => tlMember.serviceType === selectedPart)
              .map((tlMember) => (
                <TeamLeaderCard
                  id={tlMember.id}
                  profileImageUrl={tlMember.profileImage}
                  key={tlMember.id}
                  name={tlMember.name}
                  university={tlMember.university}
                  activities={tlMember.activities}
                  introduction={tlMember.introduction}
                  selfIntroduction={tlMember.selfIntroduction}
                  competitionData={tlMember.competitionData}
                />
              ))}
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
