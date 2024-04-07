import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { FC } from 'react';

import { useGetMemberProfileOfMe } from '@/api/endpoint_LEGACY/hooks';
import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import CardBack from '@/components/resolution/CardBack';
import MemberCardOfMe from '@/components/resolution/MemberCardOfMe';
import ResolutionModal from '@/components/resolution/ResolutionModal';
import { useOpenResolutionModal } from '@/components/resolution/useOpenResolutionModal';
import { LATEST_GENERATION } from '@/constants/generation';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
/**
 * @desc 신규 프로필 등록 후 다짐 메시지를 유도하는 페이지입니다.
 */
import { textStyles } from '@/styles/typography';
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

  const { isOpenResolutionModal, onCloseResolutionModal, handleResolutionModalOpen, profileImage } =
    useOpenResolutionModal();

  return (
    <>
      {profile && (
        <StyledCompletePage>
          <Responsive only='desktop'>
            <Text typography='SUIT_32_B'>프로필 등록 완료!</Text>
          </Responsive>
          <Responsive only='mobile'>
            <Text typography='SUIT_24_B'>프로필 등록 완료!</Text>
          </Responsive>
          <CardsWrapper>
            <CardBack />
            <MemberCardOfMe
              name={profile.name}
              belongs={belongs || ''}
              badges={badges || []}
              intro={profile.introduction}
              imageUrl={profile.profileImage}
            />
          </CardsWrapper>

          <ButtonWrapper>
            <Text typography='SUIT_16_SB' color={colors.gray300} mb='12'>
              솝트 구성원들의 이야기가 궁금하다면?
            </Text>
            <DefaultButton
              onClick={() => {
                router.push(playgroundLink.feedList());
              }}
            >
              플레이그라운드 시작하기
            </DefaultButton>
            {isOpenResolutionModal && (
              <ResolutionModal profileImageUrl={profileImage ?? ''} onClose={onCloseResolutionModal} />
            )}
          </ButtonWrapper>
        </StyledCompletePage>
      )}
    </>
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
  border-radius: 10px;
  background-color: ${colors.gray700};
  padding: 12px 20px;
  width: fit-content;
  height: 48px;
  color: ${colors.gray10};

  ${textStyles.SUIT_16_SB};

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  margin-top: 44px;
  width: 100%;
`;
