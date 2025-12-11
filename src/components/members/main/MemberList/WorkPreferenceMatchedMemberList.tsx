import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import Responsive from '@/components/common/Responsive/Responsive';
import Text from '@/components/common/Text';
import { DESKTOP_ONE_MEDIA_QUERY, DESKTOP_TWO_MEDIA_QUERY } from '@/components/members/main/contants';
import WorkPreferenceMemberCard from '@/components/members/main/MemberCard/WorkPreferneceMemberCard';
import RefreshIcon from '@/public/icons/icon_refresh.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const WorkPreferenceMatchedMemberList = () => {
  const data = {
    recommendations: [
      {
        id: 101,
        name: '홍길동',
        profileImage: '',
        birthday: '1995-01-01',
        university: '서울대학교',
        mbti: 'ENFP',
        workPreference: {
          ideationStyle: '즉흥',
          workTime: '아침',
          communicationStyle: '몰아서',
          workPlace: '카공',
          feedbackStyle: '직설적',
        },
        activities: [
          {
            id: 1,
            generation: 37,
            part: '서버',
            team: null,
          },
        ],
      },
      {
        id: 102,
        name: '김철수',
        profileImage: '',
        birthday: '1996-07-15',
        university: '연세대학교',
        mbti: 'ISTP',
        workPreference: {
          ideationStyle: '숙고',
          workTime: '밤',
          communicationStyle: '나눠서',
          workPlace: '집콕',
          feedbackStyle: '돌려서',
        },
        activities: [
          {
            id: 2,
            generation: 36,
            part: '웹',
            team: null,
          },
        ],
      },
      {
        id: 103,
        name: '이영희',
        profileImage: '',
        birthday: '1998-03-22',
        university: '고려대학교',
        mbti: 'INFJ',
        workPreference: {
          ideationStyle: '숙고',
          workTime: '아침',
          communicationStyle: '나눠서',
          workPlace: '카공',
          feedbackStyle: '돌려서',
        },
        activities: [
          {
            id: 3,
            generation: 35,
            part: '디자인',
            team: null,
          },
        ],
      },
      {
        id: 104,
        name: '박민수',
        profileImage: '',
        birthday: '1994-11-05',
        university: '한양대학교',
        mbti: 'ENTJ',
        workPreference: {
          ideationStyle: '즉흥',
          workTime: '밤',
          communicationStyle: '몰아서',
          workPlace: '집콕',
          feedbackStyle: '직설적',
        },
        activities: [
          {
            id: 4,
            generation: 38,
            part: '기획',
            team: 'PM 팀',
          },
        ],
      },
    ],
  };

  return (
    <StyledContainer>
      <TitleWrapper>
        <Responsive only='desktop'>
          <Text typography='SUIT_20_B' color={colors.gray10}>
            나와 37기 사람들의 작업 궁합은?
          </Text>
        </Responsive>
        <Responsive only='mobile'>
          <Text typography='SUIT_16_B' color={colors.gray10}>
            나와 37기 사람들의 작업 궁합은?
          </Text>
        </Responsive>
        <RefreshIconWrapper>
          <RefreshIcon style={{ width: '24px', height: '24px', flexShrink: 0 }} />
          <Responsive only='mobile'>
            <MobileTooltipWrapper>
              <Text typography='SUIT_13_M' color={colors.gray50}>
                더 많은 멤버를 찾아보세요!
              </Text>
            </MobileTooltipWrapper>
          </Responsive>
        </RefreshIconWrapper>
        <Responsive only='desktop'>
          <TooltipWrapper>
            <Text typography='SUIT_13_M' color={colors.gray50}>
              더 많은 멤버를 찾아보세요!
            </Text>
          </TooltipWrapper>
        </Responsive>
      </TitleWrapper>
      <WorkPreferenceMemberListWrapper>
        {data.recommendations.map((recommendation) => (
          <WorkPreferenceMemberCard key={recommendation.id} {...recommendation} />
        ))}
      </WorkPreferenceMemberListWrapper>
    </StyledContainer>
  );
};

const MobileTooltipWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  align-items: center;
  transform: translateX(-50%);
  margin-bottom: 9px;
  border-radius: 12px;
  background-color: ${colors.gray600};
  padding: 12px 14px;
  width: max-content;

  &::before {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -5%);
    background-color: ${colors.gray600};
    width: 20px;
    height: 14px;
    clip-path: polygon(0 0, 50% 100%, 100% 0);
    content: '';
  }
`;

const RefreshIconWrapper = styled.div`
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
`;

const TooltipWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  margin-left: 9px;
  border-radius: 12px;
  background-color: ${colors.gray600};
  padding: 12px;

  &::before {
    position: absolute;
    top: 50%;
    left: -10px;
    transform: translateY(-50%);
    background-color: ${colors.gray600};
    width: 12px;
    height: 14px;
    clip-path: polygon(0 40%, 100% 0%, 100% 100%);
    content: '';
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 90px;
  width: 100%;
  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 24px;
    padding: 12px 0;
  }
`;

const WorkPreferenceMemberListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(10px, 319px));
  gap: 12px;
  align-items: center;
  justify-items: stretch;
  height: 190px;
  overflow-y: hidden;
  scrollbar-width: none;

  @media ${DESKTOP_ONE_MEDIA_QUERY} {
    grid-template-columns: repeat(3, minmax(10px, 319px));
  }

  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    grid-template-columns: repeat(2, minmax(10px, 319px));
  }

  @media ${MOBILE_MEDIA_QUERY} {
    grid-template-columns: repeat(1, 1fr);
    gap: 0 8px;
    justify-items: stretch;
    margin-top: 0;

    > div {
      width: 100%;
    }
  }
`;
export default WorkPreferenceMatchedMemberList;
