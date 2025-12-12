import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useQueryClient } from '@tanstack/react-query';

import { useGetRecommendations } from '@/api/endpoint/members/getRecommendations';
import Responsive from '@/components/common/Responsive/Responsive';
import Text from '@/components/common/Text';
import { DESKTOP_ONE_MEDIA_QUERY, DESKTOP_TWO_MEDIA_QUERY } from '@/components/members/main/contants';
import WorkPreferenceMemberCard from '@/components/members/main/MemberCard/WorkPreferneceMemberCard';
import RefreshIcon from '@/public/icons/icon_refresh.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
const WorkPreferenceMatchedMemberList = () => {
  const { data, isLoading } = useGetRecommendations();
  const isEmpty = data?.recommendations && data.recommendations.length === 0;
  const hasWorkPreference = data?.hasWorkPreference;
  const queryClient = useQueryClient();

  if (isLoading) {
    return (
      <div
        style={{
          width: '100%',
          height: '190px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '90px',
        }}
      >
        loading...
      </div>
    );
  }
  const recommendations = data?.recommendations || [];

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
          <button
            onClick={() => {
              queryClient.invalidateQueries({ queryKey: ['getRecommendations'] });
            }}
          >
            <RefreshIcon style={{ width: '24px', height: '24px', flexShrink: 0, cursor: 'pointer' }} />
          </button>
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
        {recommendations.map((recommendation) => (
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
