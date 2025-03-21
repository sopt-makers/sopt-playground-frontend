import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
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
  const isResolutionOpen = false; // 다짐메시지 오픈 기간에만 이 값을 true로 변경합니다.

  const { handleResolutionModalOpen, isOpenResolutionModal, onCloseResolutionModal, name } = useOpenResolutionModal();

  return (
    <AuthRequired>
      {profile && (
        <StyledCompletePage>
          <Responsive only='desktop'>
            <Text typography='SUIT_32_B'>프로필 등록 완료!</Text>
          </Responsive>
          <Responsive only='mobile'>
            <Text typography='SUIT_24_B'>프로필 등록 완료!</Text>
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
          {isLastGeneration && isResolutionOpen ? (
            <ButtonWrapper>
              <Button
                onClick={() => {
                  router.push(playgroundLink.feedList());
                }}
                size='lg'
                theme='black'
              >
                홈으로 가기
              </Button>
              <LoggingClick eventKey='profileUploadResolution'>
                <Button
                  onClick={handleResolutionModalOpen}
                  size='lg'
                  style={{
                    background: 'linear-gradient(90deg, #8fc0ff 0%, #5ba3ff 100%)',
                    color: `${colors.black}`,
                  }}
                >
                  35기 다짐하러 가기
                </Button>
              </LoggingClick>
              {isOpenResolutionModal && (
                <TimecapsopSubmitModal userName={name ?? '나'} onClose={onCloseResolutionModal} />
              )}
            </ButtonWrapper>
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
        </StyledCompletePage>
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
  margin: 50px 0;
  padding: 16px;
  width: 100%;
  @media ${MOBILE_MEDIA_QUERY} {
    margin: 30px 0;
  }
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

const DefaultButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: ${colors.gray700};
  padding: 12px 20px;
  width: fit-content;
  height: 48px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const ResolutionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: linear-gradient(90deg, #8fc0ff 0%, #5ba3ff 100%);
  padding: 12px 20px;
  width: fit-content;
  height: 48px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  margin-top: 44px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 56px;
`;
