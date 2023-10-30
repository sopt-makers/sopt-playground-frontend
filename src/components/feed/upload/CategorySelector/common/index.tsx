import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import FocusTrap from 'focus-trap-react';
import { FC, HTMLAttributes, PropsWithChildren, ReactNode, useEffect, useRef } from 'react';

import Portal from '@/components/common/Portal';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

export interface ModalProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  header?: ReactNode;
  isOpen?: boolean;
  className?: string;
  onClose: () => void;
}
export const Sheet: FC<ModalProps> = (props) => {
  const { header, children, className, isOpen, onClose, ...restProps } = props;
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', keydownHandler);

    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  }, [onClose]);

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
  padding-top: 56px;
  height: 100vh;

  @media ${MOBILE_MEDIA_QUERY} {
    justify-content: flex-end;
    padding-top: 0;
    padding-bottom: 8px;
  }
`;

const StyledBackground = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  width: 100%;
  height: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    background-color: rgb(15 15 18 / 80%);
  }
`;

const StyledModal = styled.div`
  position: relative;
  border-radius: 14px;
  background: ${colors.gray800};
  padding: 8px 0;
  color: ${colors.gray10};

  &.category-drop {
    width: 366px;

    @media ${MOBILE_MEDIA_QUERY} {
      width: 100%;
    }
  }

  &.tag-drop {
    width: 160px;

    @media ${MOBILE_MEDIA_QUERY} {
      width: 100%;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 20px;
    padding: 24px 0 16px;
    width: 100%;
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
