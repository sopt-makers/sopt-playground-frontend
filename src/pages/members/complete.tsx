import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Button } from '@sopt-makers/ui';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { FC } from 'react';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { useGetMemberProfileOfMe } from '@/api/endpoint_LEGACY/hooks';
import AuthRequired from '@/components/auth/AuthRequired';
import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import CardBack from '@/components/members/upload/complete/CardBack';
import MemberCardOfMe from '@/components/members/upload/complete/MemberCardOfMe';
import PlaygroundGuideModal from '@/components/resolution/submit/PlaygroundGuideModal';
import TimecapsopSubmitModal from '@/components/resolution/submit/TimecapsopSubmitModal';
import { useOpenResolutionModal } from '@/components/resolution/submit/useOpenResolutionModal';
import { LATEST_GENERATION } from '@/constants/generation';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
/**
 * @desc 신규 프로필 등록 후 다짐 메시지를 유도하는 페이지입니다. 다짐메시지 기간 이외에는 홈으로 가는 CTA만 존재합니다.
 */
import { setLayout } from '@/utils/layout';

const CompletePage: FC = () => {
  const router = useRouter();
  const { data: profile } = useGetMemberProfileOfMe();
  const belongs = profile?.careers.find((career) => career.isCurrent)?.companyName ?? profile?.university;
  const sorted = profile && [...profile.soptActivities].sort((a, b) => b.generation - a.generation);
  const badges =
    profile &&
    sorted?.map((activity) => ({
      content: `${activity.generation}기 ${activity.part}`,
      isActive: activity.generation === LATEST_GENERATION,
    }));
  const { data: myData } = useGetMemberOfMe();
  const isLastGeneration = myData?.generation === LATEST_GENERATION;
  const isResolutionOpen = true; // 다짐메시지 오픈 기간에만 이 값을 true로 변경합니다.

  const {
    handleResolutionModalOpen,
    isOpenResolutionModal,
    onCloseResolutionModal,
    name,
    isOpenPlaygroundGuideModal,
    onClosePlaygroundGuideModal,
    onOpenPlaygroundGuideModal,
  } = useOpenResolutionModal();

  return (
    <AuthRequired>
      {profile && (
        <StyledCompletePage>
          <StyledCompletedLayout>
            <Responsive only='desktop'>
              <h1 className='desktop-title'>프로필 등록 완료!</h1>
            </Responsive>
            <Responsive only='mobile'>
              <h1 className='mobile-title'>프로필 등록 완료!</h1>
            </Responsive>
            <CardsWrapper>
              <CardBack isLastGeneration={isLastGeneration && isResolutionOpen} />
              <MemberCardOfMe
                name={profile.name}
                belongs={belongs || ''}
                badges={badges || []}
                intro={profile.introduction}
                imageUrl={profile.profileImage}
              />
            </CardsWrapper>
            <Responsive only='desktop'>
              {isLastGeneration && isResolutionOpen ? (
                <BottomSection>
                  <p>AT SOPT만을 위한 타임캡솝을 준비했어요</p>
                  <LoggingClick eventKey='profileUploadResolution'>
                    <ResolutionButton onClick={handleResolutionModalOpen}>타임캡솝 만들기</ResolutionButton>
                  </LoggingClick>
                </BottomSection>
              ) : (
                <BottomSection>
                  <Text typography='SUIT_16_SB' color={colors.gray300} mb='12'>
                    솝트 구성원들의 이야기가 궁금하다면?
                  </Text>
                  <Button
                    onClick={() => {
                      router.push(playgroundLink.feedList());
                    }}
                    size='lg'
                    theme='black'
                  >
                    플레이그라운드 시작하기
                  </Button>
                </BottomSection>
              )}
            </Responsive>
          </StyledCompletedLayout>
          <Responsive only='mobile'>
            {isLastGeneration && isResolutionOpen ? (
              <BottomSection>
                <p>AT SOPT만을 위한 타임캡솝을 준비했어요</p>
                <LoggingClick eventKey='profileUploadResolution'>
                  <ResolutionButton onClick={handleResolutionModalOpen}>타임캡솝 만들기</ResolutionButton>
                </LoggingClick>
              </BottomSection>
            ) : (
              <BottomSection>
                <Text typography='SUIT_16_SB' color={colors.gray300} mb='12'>
                  솝트 구성원들의 이야기가 궁금하다면?
                </Text>
                <Button
                  onClick={() => {
                    router.push(playgroundLink.feedList());
                  }}
                  size='lg'
                  theme='black'
                >
                  플레이그라운드 시작하기
                </Button>
              </BottomSection>
            )}
          </Responsive>
        </StyledCompletePage>
      )}
      {isOpenResolutionModal && (
        <TimecapsopSubmitModal
          userName={name ?? '나'}
          onClose={onCloseResolutionModal}
          onSuccess={onOpenPlaygroundGuideModal}
        />
      )}
      {isOpenPlaygroundGuideModal && (
        <PlaygroundGuideModal
          onClose={() => {
            onClosePlaygroundGuideModal();
            router.push(playgroundLink.feedList());
          }}
        />
      )}
    </AuthRequired>
  );
};

export default CompletePage;

setLayout(CompletePage, 'header');

const StyledCompletePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  .desktop-title {
    ${fonts.HEADING_32_B}
  }

  .mobile-title {
    ${fonts.HEADING_24_B}
  }

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 30px 0;
  }
`;

export const StyledCompletedLayout = styled.div`
  display: flex;
  position: fixed;
  top: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateY(-50%);
  width: 100%;
`;

const CardsWrapper = styled.div`
  display: inline-grid;
  justify-items: center;
  transform-style: preserve-3d;
  transition: transform 0.3s;
  margin-top: 32px;
  width: 100%;
  animation-name: flip;
  animation-duration: 1s;
  animation-delay: 0.8s;
  animation-fill-mode: forwards;

  @keyframes flip {
    0% {
      transform: perspective(800px) rotateY(0deg);
    }

    100% {
      transform: perspective(800px) rotateY(180deg);
    }
  }

  & > * {
    grid-area: 1 / 1 / 1 / 1;
    backface-visibility: hidden;
  }
`;

const ResolutionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: linear-gradient(90deg, #d5d6e3 0%, #939aab 100%);
  padding: 16px 26px;
  width: 100%;
  max-width: 320px;
  height: 48px;
  color: ${colors.black};
  ${fonts.LABEL_18_SB}

  &:hover {
    background: ${colors.gray50};
  }
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  margin-top: 18px;
  width: 100%;

  p {
    color: ${colors.white};
    ${fonts.BODY_16_M}
  }

  @media ${MOBILE_MEDIA_QUERY} {
    position: fixed;
    bottom: 21px;
    left: 0;
    margin-top: 0;
  }
`;
