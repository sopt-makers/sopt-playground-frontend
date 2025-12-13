import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Button } from '@sopt-makers/ui';
import { useQueryClient } from '@tanstack/react-query';

import { useGetRecommendations } from '@/api/endpoint/members/getRecommendations';
import { useGetMyWorkPreference } from '@/api/endpoint/members/getWorkPreference';
import useModalState from '@/components/common/Modal/useModalState';
import Responsive from '@/components/common/Responsive/Responsive';
import Text from '@/components/common/Text';
import { convertWorkPreferenceToHashtags } from '@/components/matchmember/constant';
import { useMatchMemberEvent } from '@/components/matchmember/hooks/useMatchMemberEvent';
import MatchMemberModal from '@/components/matchmember/MatchMemberModal';
import { DESKTOP_ONE_MEDIA_QUERY, DESKTOP_TWO_MEDIA_QUERY } from '@/components/members/main/contants';
import WorkPreferenceMemberCard from '@/components/members/main/MemberCard/WorkPreferneceMemberCard';
import { mockRecommendationsResponse } from '@/components/members/main/MemberList/constants';
import RefreshIcon from '@/public/icons/icon_refresh.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const MyPreferenceSubTitle = () => {
  const { data: myData, isLoading: myLoading } = useGetMyWorkPreference();

  if (myLoading || !myData?.workPreference) return <></>;

  const tags = convertWorkPreferenceToHashtags(myData.workPreference);

  return <SubTitle>내 작업 스타일은 {tags}</SubTitle>;
};

const WorkPreferenceMatchedMemberList = () => {
  const { data, isLoading } = useGetRecommendations();
  const isEmpty = data?.recommendations && data.recommendations.length === 0;
  const hasWorkPreference = data?.hasWorkPreference;

  const queryClient = useQueryClient();
  const { canOpenModal, handleCloseForToday } = useMatchMemberEvent();
  const { isOpen, onOpen, onClose } = useModalState();

  const handleClickStartButton = () => {
    if (canOpenModal) {
      onOpen();
    }
  };

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
      ></div>
    );
  }
  const recommendations = data?.recommendations || [];

  return (
    <>
      <StyledContainer>
        <TitleContainer>
          <TitleWrapper>
            <Responsive only='desktop'>
              <Text typography='SUIT_24_B' color={colors.gray10}>
                나와 37기 사람들의 작업 궁합은?
              </Text>
            </Responsive>
            <Responsive only='mobile'>
              <Text typography='SUIT_16_B' color={colors.gray10}>
                나와 37기 사람들의 작업 궁합은?
              </Text>
            </Responsive>
            {!isEmpty && hasWorkPreference && (
              <>
                <RefreshIconWrapper>
                  <button
                    onClick={() => {
                      queryClient.invalidateQueries({ queryKey: ['getRecommendations'] });
                    }}
                  >
                    <StyledRefreshIcon />
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
              </>
            )}
          </TitleWrapper>
          {!isEmpty && hasWorkPreference && <MyPreferenceSubTitle />}
        </TitleContainer>
        {isEmpty ? (
          <EmptyStateWrapper>
            <WorkPreferenceMemberListWrapper isEmpty={isEmpty}>
              {mockRecommendationsResponse.recommendations.map((recommendation) => (
                <WorkPreferenceMemberCard key={recommendation.id} {...recommendation} />
              ))}
            </WorkPreferenceMemberListWrapper>
            <EmptyStateContent>
              <Text
                typography='SUIT_16_B'
                color={colors.gray10}
                style={{ textAlign: 'center', whiteSpace: 'pre-line' }}
              >
                {hasWorkPreference
                  ? '아직 나와 맞는 멤버가 나타나지 않았어요. \n 다른 멤버들을 살펴볼까요?'
                  : '나의 작업 스타일을 5초만에 알아보고\n찰떡 케미 앱잼 멤버 확인해요!'}
              </Text>

              {/* TODO: 작업선택 모달 오픈로직 추가 */}
              {!hasWorkPreference && (
                <Button variant='fill' theme='white' onClick={handleClickStartButton}>
                  작업 스타일 선택하기
                </Button>
              )}
            </EmptyStateContent>
          </EmptyStateWrapper>
        ) : (
          <WorkPreferenceMemberListWrapper isEmpty={!!isEmpty}>
            {recommendations.map((recommendation) => (
              <WorkPreferenceMemberCard key={recommendation.id} {...recommendation} />
            ))}
          </WorkPreferenceMemberListWrapper>
        )}
      </StyledContainer>
      <MatchMemberModal isOpen={isOpen} onClose={onClose} handleCloseForToday={handleCloseForToday} />
    </>
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

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 2px;
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

const WorkPreferenceMemberListWrapper = styled.div<{ isEmpty: boolean }>`
  display: grid;
  grid-template-columns: repeat(4, minmax(10px, 319px));
  gap: 12px;
  align-items: center;
  justify-items: stretch;
  height: 190px;
  overflow-y: hidden;
  scrollbar-width: none;
  filter: ${({ isEmpty }) => (isEmpty ? 'blur(6px)' : 'none')};

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

const EmptyStateWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;
const EmptyStateContent = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
`;

const StyledRefreshIcon = styled(RefreshIcon)`
  flex-shrink: 0;
  cursor: pointer;
  width: 32px;
  height: 32px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 24px;
    height: 24px;
  }
`;

const SubTitle = styled.p`
  ${fonts.TITLE_18_SB};

  color: ${colors.gray200};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.BODY_13_M};
  }
`;
export default WorkPreferenceMatchedMemberList;
