import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import FocusTrap from 'focus-trap-react';
import { FC, HTMLAttributes, PropsWithChildren, ReactNode, useRef } from 'react';

import Portal from '@/components/common/Portal';
import { useEscapeCallback } from '@/hooks/useEscapeCallback';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

export interface ModalProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  header?: ReactNode;
  isOpen?: boolean;
  className?: string;
  onClose: () => void;
}
export const DropDown: FC<ModalProps> = (props) => {
  const { header, children, className, isOpen, onClose, ...restProps } = props;
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
          <ModalContainer>
            <ModalWrapper>
              <StyledModal ref={modalRef} role='dialog' className={className} {...restProps}>
                <StyledHeader>{header && header}</StyledHeader>
                <ModalContent>{children}</ModalContent>
              </StyledModal>
            </ModalWrapper>
          </ModalContainer>
        </FocusTrap>
      </StyledBackground>
    </Portal>
  );
};

const ModalContainer = styled.div`
  @media ${MOBILE_MEDIA_QUERY} {
    margin: 0 16px;
    width: 100%;
  }
`;
const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 69px;
  height: 100vh;

  @supports (height: 100dvh) {
    height: 100dvh;
  }
`;

const StyledBackground = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const StyledModal = styled.div`
  position: relative;
  border-radius: 14px;
  background: ${colors.gray800};
  padding: 12px 0;
  color: ${colors.gray10};

  &.category-drop {
    width: 366px;
  }

  &.tag-drop {
    width: 160px;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 8px;
`;

const StyledHeader = styled.button`
  display: flex;
`;
