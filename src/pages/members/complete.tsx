import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { FC } from 'react';

import { useGetMemberProfileOfMe } from '@/api/endpoint_LEGACY/hooks';
import Text from '@/components/common/Text';
import EmptyProfile from '@/components/members/detail/EmptyProfile';
import CardBack from '@/components/resolution/CardBack';
import MemberCardOfMe from '@/components/resolution/MemberCardofMe';
import { LATEST_GENERATION } from '@/constants/generation';
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

  return (
    <>
      {profile ? (
        <StyledCompletePage>
          <Text typography='SUIT_32_B'>프로필 등록 완료!</Text>
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
          <ButtonsWrapper>
            <DefaultButton
              onClick={() => {
                router.push(playgroundLink.feedList());
              }}
            >
              홈으로 돌아가기
            </DefaultButton>
            <CtaButton
              onClick={() => {
                //다짐메시지 모달
              }}
            >
              NOW, 다짐하러 가기
            </CtaButton>
          </ButtonsWrapper>
        </StyledCompletePage>
      ) : (
        <EmptyProfile />
      )}
    </>
  );
};

export default CompletePage;

setLayout(CompletePage, 'headerFooter');

const StyledCompletePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  @supports (height: 100dvh) {
    height: 100dvh;
  }
`;

const CardsWrapper = styled.div`
  display: inline-grid;
  transform-style: preserve-3d;
  transition: transform 0.3s;
  margin-top: 32px;
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
  height: 48px;
  color: ${colors.gray10};

  ${textStyles.SUIT_16_SB};
`;
const CtaButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: linear-gradient(90deg, #effdb4 0%, #bdec00 100%);
  padding: 12px 20px;
  height: 48px;
  color: ${colors.black};

  ${textStyles.SUIT_16_SB};
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 56px;
`;
