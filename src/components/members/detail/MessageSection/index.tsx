import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import useModalState from '@/components/common/Modal/useModalState';
import useToast from '@/components/common/Toast/useToast';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import MemberDetailSection from '@/components/members/detail/MemberDetailSection';
import MessageModal, { MessageCategory } from '@/components/members/detail/MessageSection/MessageModal';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MessageSectionProps {
  name: string;
  email: string;
  profileImage: string;
  memberId: string;
}

export default function MessageSection({ name, email, profileImage, memberId }: MessageSectionProps) {
  const { isOpen: isOpenMessageModal, onOpen: onOpenMessageModal, onClose: onCloseMessageModal } = useModalState();
  const toast = useToast();
  const { logSubmitEvent } = useEventLogger();

  const isEmptyEmail = email === null || email.length < 1;

  const handleClickMessageButton = () => {
    if (isEmptyEmail) {
      toast.show({ message: `해당 유저는 이메일을 등록하지 않아 쪽지를 보낼 수 없어요.` });
    } else {
      onOpenMessageModal();
    }
  };

  return (
    <>
      <StyledMemberDetailSection>
        <div>
          <Title>{name}에게 하고 싶은 질문이 있나요?</Title>
          <Subtitle>“저에게 궁금한게 있다면 편하게 남겨주세요~”</Subtitle>
        </div>
        <MessageButton onClick={handleClickMessageButton} disabled={isEmptyEmail}>
          쪽지 보내기
        </MessageButton>
      </StyledMemberDetailSection>
      {isOpenMessageModal && (
        <MessageModal
          receiverId={memberId}
          name={name}
          profileImageUrl={profileImage}
          onClose={onCloseMessageModal}
          defaultCategory={MessageCategory.COFFEE_CHAT}
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
}

const StyledMemberDetailSection = styled(MemberDetailSection)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 36px;
  padding-bottom: 36px;

  .message-button:hover + .no-message-tooltip {
    opacity: 1;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 24px;
  }
`;

const Title = styled.div`
  color: ${colors.white};
  ${textStyles.SUIT_18_SB}
  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_16_SB}
  }
`;

const Subtitle = styled.div`
  margin-top: 12px;
  color: ${colors.gray300};
  ${textStyles.SUIT_16_M}
  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_M}
  }
`;

const MessageButton = styled.div<{ disabled: boolean }>`
  border-radius: 14px;
  background-color: ${({ disabled }) => (disabled ? colors.gray800 : colors.gray10)};
  cursor: pointer;
  padding: 15px 36px;
  color: ${({ disabled }) => (disabled ? colors.gray400 : colors.gray900)};

  &:hover {
    background-color: ${colors.gray50};
    color: ${colors.gray900};
  }

  ${textStyles.SUIT_15_SB}

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 34px;
    padding: 15px;
    width: 100%;
    text-align: center;
    ${textStyles.SUIT_16_SB}
  }
`;
