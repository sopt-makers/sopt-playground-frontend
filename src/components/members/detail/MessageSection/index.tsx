import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Button } from '@sopt-makers/ui';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';

import { ProfileDetail } from '@/api/endpoint_LEGACY/members/type';
import useModalState from '@/components/common/Modal/useModalState';
import Text from '@/components/common/Text';
import useToast from '@/components/common/Toast/useToast';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import MemberDetailSection from '@/components/members/detail/ActivitySection/MemberDetailSection';
import MessageModal, { MessageCategory } from '@/components/members/detail/MessageSection/MessageModal';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface MessageSectionProps {
  memberId: string;
  profile: ProfileDetail;
}

export default function MessageSection({ memberId, profile }: MessageSectionProps) {
  const { name, email, profileImage, isCoffeeChatActivate, phone, isPhoneBlind } = profile;

  const { isOpen: isOpenMessageModal, onOpen: onOpenMessageModal, onClose: onCloseMessageModal } = useModalState();
  const toast = useToast();
  const router = useRouter();
  const { logClickEvent, logSubmitEvent } = useEventLogger();

  const isEmptyPhone = (!phone || phone.length < 1) && !isPhoneBlind;

  const handleClickMessageButton = () => {
    if (isEmptyPhone) {
      toast.show({ message: `해당 유저는 전화번호를 등록하지 않아 쪽지를 보낼 수 없어요.` });
    } else {
      onOpenMessageModal();
    }
  };

  const handleClickCoffeeChatButton = () => {
    logClickEvent('gotoCoffeechat', {
      organization:
        profile.careers.length > 0 ? profile.careers[0].companyName : profile.university ? profile.university : '',
      job: profile.careers.length > 0 ? profile.careers[0].title : '',
      generation: profile.soptActivities.map((activity) => activity.generation),
      part: [...new Set(profile.soptActivities.map((activity) => activity.part))],
    });

    router.push(playgroundLink.coffeechatDetail(memberId));
  };

  const handleClickCoffeeChatOpenButton = () => {
    router.push(playgroundLink.coffeechatUpload());
  };

  const Mine = () => {
    return (
      <>
        {!profile.isCoffeeChatActivate && (
          <StyledMemberDetailSection>
            <TitleWrapper>
              <Title typography='SUIT_18_SB'>SOPT 회원들과 나누고 싶은 이야기가 있나요?</Title>
              <Subtitle typography='SUIT_16_M' color={colors.gray300}>
                어떤 내용이라도 좋아요. 편하게 오픈해 보세요!
              </Subtitle>
            </TitleWrapper>
            <ButtonWrapper>
              <CoffeeChatButton size='sm' theme='black' onClick={handleClickCoffeeChatOpenButton}>
                커피챗 오픈하러 가기
              </CoffeeChatButton>
            </ButtonWrapper>
          </StyledMemberDetailSection>
        )}
      </>
    );
  };

  const Others = () => {
    return (
      <>
        <StyledMemberDetailSection>
          <TitleWrapper>
            <Title typography='SUIT_18_SB'>{name}님과 나누고 싶은 이야기가 있나요?</Title>
            <Subtitle typography='SUIT_16_M' color={colors.gray300}>
              궁금한 점에 대해 편하게 소통해보세요!
            </Subtitle>
          </TitleWrapper>
          <ButtonWrapper>
            {isCoffeeChatActivate && (
              <CoffeeChatButton size='sm' theme='black' onClick={handleClickCoffeeChatButton}>
                커피챗 보러가기
              </CoffeeChatButton>
            )}
            <MessageButton size='sm' onClick={handleClickMessageButton} disabled={isEmptyPhone}>
              쪽지 보내기
            </MessageButton>
          </ButtonWrapper>
        </StyledMemberDetailSection>
        {isOpenMessageModal && (
          <MessageModal
            receiverId={memberId}
            name={name}
            profileImageUrl={profileImage}
            onClose={onCloseMessageModal}
            defaultCategory={MessageCategory.NETWORK}
            onLog={(options) =>
              logSubmitEvent('sendMessage', {
                category: options?.category?.toString() ?? '',
                receiverId: +memberId,
                referral: 'memberDetail',
              })
            }
          />
        )}
      </>
    );
  };

  return profile.isMine ? <Mine /> : <Others />;
}

const StyledMemberDetailSection = styled(MemberDetailSection)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 32px 40px;
  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    gap: 24px;
    align-items: flex-start;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled(Text)`
  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 16px;
  }
`;

const Subtitle = styled(Text)`
  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 14px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const CoffeeChatButton = styled(Button)`
  background-color: ${colors.gray700};
  min-width: 132px;
  min-height: 42px;
  color: ${colors.white};

  &:hover {
    background-color: ${colors.gray600};
    color: ${colors.white};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const MessageButton = styled(Button)<{ disabled: boolean }>`
  display: flex;
  background-color: ${({ disabled }) => (disabled ? colors.gray800 : colors.gray10)};
  min-width: 124px;
  min-height: 42px;
  color: ${({ disabled }) => (disabled ? colors.gray400 : colors.gray950)};

  ${({ disabled }) =>
    !disabled &&
    css`
      &:hover {
        background-color: ${colors.gray50};
        color: ${colors.gray950};
      }
    `};

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;
