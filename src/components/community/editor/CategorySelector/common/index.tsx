import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import FocusTrap from 'focus-trap-react';
import { FC, HTMLAttributes, PropsWithChildren, useEffect, useRef } from 'react';

import Portal from '@/components/common/Portal';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import BackArrow from '@/public/icons/icon_chevron_left.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export interface ModalProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  title?: string;
  isBack?: boolean;
  isOpen?: boolean;
  onBack?: () => void;
  onClose: () => void;
}
const Sheet: FC<ModalProps> = (props) => {
  const { title, isBack, children, isOpen, onClose, onBack, ...restProps } = props;
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
              <StyledModal ref={modalRef} role='dialog' {...restProps}>
                <StyledHeader>
                  {title && (
                    <StyledTitle>
                      {isBack && <BackArrowIc onClick={onBack} />}
                      {title}
                    </StyledTitle>
                  )}
                </StyledHeader>
                <ModalContent>{children}</ModalContent>
              </StyledModal>
            </ModalWrapper>
          </ModalContainer>
        </FocusTrap>
      </StyledBackground>
    </Portal>
  );
};

export default Sheet;

const BackArrowIc = styled(BackArrow)``;

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
  z-index: 99999;
  width: 100%;
  height: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    background-color: rgb(15 15 18 / 80%);
  }
`;

const StyledModal = styled.div`
  position: relative;
  z-index: 101;
  border-radius: 14px;
  background: ${colors.gray800};
  padding: 8px 0;
  width: 366px;
  color: ${colors.gray10};

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

const StyledTitle = styled.div`
  ${textStyles.SUIT_20_B}

  padding: 0 20px 12px;
`;
