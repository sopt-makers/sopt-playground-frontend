import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import useModalState from '@/components/common/Modal/useModalState';
import useToast from '@/components/common/Toast/useToast';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
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

  const isEmptyEmail = !email || email.length < 1;

  const handleClickMessageButton = () => {
    if (isEmptyEmail) {
      toast.show({ message: `해당 유저는 이메일을 등록하지 않아 쪽지를 보낼 수 없어요.` });
    } else {
      onOpenMessageModal();
    }
  };

  return (
    <>
      <MessageButton onClick={handleClickMessageButton} disabled={isEmptyEmail}>
        <SendIcon disabled={isEmptyEmail} />
        궁금한 점 질문해보기
      </MessageButton>
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

const MessageButton = styled.div<{ disabled: boolean }>`
  display: flex;
  position: absolute;
  top: 40px;
  right: 40px;
  gap: 4px;
  align-items: center;
  justify-content: center;
  border-radius: 90px;
  background-color: ${({ disabled }) => (disabled ? colors.gray800 : colors.gray10)};
  cursor: pointer;
  padding: 12px 20px;
  height: 42px;
  color: ${({ disabled }) => (disabled ? colors.gray400 : colors.gray950)};

  ${({ disabled }) =>
    !disabled &&
    css`
      &:hover {
        background-color: ${colors.gray50};
        color: ${colors.gray950};
      }
    `};

  ${textStyles.SUIT_15_SB}

  @media ${MOBILE_MEDIA_QUERY} {
    position: static;
    border-radius: 10px;
    ${textStyles.SUIT_16_SB};
  }
`;

function SendIcon({ disabled }: { disabled: boolean }) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <path
        d='M8.74928 11.2501L17.4993 2.50014M8.85559 11.5235L11.0457 17.1552C11.2386 17.6513 11.3351 17.8994 11.4741 17.9718C11.5946 18.0346 11.7381 18.0347 11.8587 17.972C11.9978 17.8998 12.0946 17.6518 12.2881 17.1559L17.78 3.08281C17.9547 2.63516 18.0421 2.41133 17.9943 2.26831C17.9528 2.1441 17.8553 2.04663 17.7311 2.00514C17.5881 1.95736 17.3643 2.0447 16.9166 2.21939L2.84349 7.71134C2.34759 7.90486 2.09965 8.00163 2.02739 8.14071C1.96475 8.26129 1.96483 8.40483 2.02761 8.52533C2.10004 8.66433 2.3481 8.7608 2.84422 8.95373L8.47589 11.1438C8.5766 11.183 8.62695 11.2026 8.66935 11.2328C8.70693 11.2596 8.7398 11.2925 8.7666 11.3301C8.79685 11.3725 8.81643 11.4228 8.85559 11.5235Z'
        stroke={disabled ? colors.gray400 : 'black'}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}
