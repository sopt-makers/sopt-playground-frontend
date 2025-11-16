import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconXClose } from '@sopt-makers/icons';
import FocusTrap from 'focus-trap-react';
import { FC, HTMLAttributes, PropsWithChildren, ReactNode, useRef } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import Portal from '@/components/common/Portal';
import { useEscapeCallback } from '@/hooks/useEscapeCallback';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import IconModalCheck from '@/public/icons/icon-modal-check.svg';
import IconModalClose from '@/public/icons/icon-modal-close.svg';
import { MB_BIG_MEDIA_QUERY, MB_MID_MEDIA_QUERY, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

/**
 * @deprecated MessageModal 만을 위한 임시 모달 입니다. 모바일 화면에 대응하기 위해 임시로 사용돼요.
 */
export interface ModalProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  confirmIcon?: boolean;
  title?: string;
  content?: ReactNode;
  isOpen?: boolean;
  width?: number;
  className?: string;
  onClose: () => void;
}

const Modal: FC<ModalProps> = (props) => {
  const { confirmIcon, children, title = '', content, isOpen, onClose, width, ...restProps } = props;
  const modalRef = useRef<HTMLDivElement>(null);

  useEscapeCallback({
    callback: onClose,
  });

  useOnClickOutside(modalRef, onClose);

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <StyledBackground>
        <FocusTrap>
          <RemoveScroll>
            <StyledModal ref={modalRef} role='dialog' width={width} {...restProps}>
              <StyledCloseButton type='button' onClick={onClose}>
                <StyledIconClose />
              </StyledCloseButton>
              <ModalContent>
                {confirmIcon && <StyledIconCheck />}
                {title && <StyledTitle>{title}</StyledTitle>}
                {content && <StyledContent>{content}</StyledContent>}
                {children}
              </ModalContent>
            </StyledModal>
          </RemoveScroll>
        </FocusTrap>
      </StyledBackground>
    </Portal>
  );
};

export default Modal;

const StyledBackground = styled.div<{ visible?: boolean }>`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  z-index: 200;
  background-color: ${colors.backgroundDimmed};
  width: 100%;
  height: 100%;
`;

const StyledModal = styled.div<{ width?: number }>`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 16px;
  z-index: 101;
  border-radius: 22.94px;
  background: ${colors.gray800};
  width: ${({ width }) => width ?? 450}px;
  color: ${colors.gray10};
`;

const StyledCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: end;
  cursor: pointer;
  padding-top: 32px;
  padding-right: 32px;
  color: ${colors.white};

  @media ${MB_MID_MEDIA_QUERY} {
    padding-top: 24px;
    padding-right: 24px;
  }
`;

const StyledIconClose = styled(IconXClose)`
  width: 24px;
  height: 24px;
`;

const StyledIconCheck = styled(IconModalCheck)`
  margin-bottom: 18px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 32px 40px;

  @media ${MB_BIG_MEDIA_QUERY} {
    padding: 0 24px 32px;
  }
`;

const StyledTitle = styled.h1`
  ${textStyles.SUIT_24_B}
`;

const StyledContent = styled.div`
  margin-top: 18px;
  color: ${colors.gray200};

  ${textStyles.SUIT_18_M};
`;
