import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import FocusTrap from 'focus-trap-react';
import { FC, HTMLAttributes, PropsWithChildren, ReactNode, useRef } from 'react';

import Portal from '@/components/common/Portal';
import { useEscapeCallback } from '@/hooks/useEscapeCallback';
import useOnClickOutside from '@/hooks/useOnClickOutside';

export interface BottomSheetProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  header?: ReactNode;
  isOpen?: boolean;
  className?: string;
  onClose: () => void;
}
export const BottomSheet: FC<BottomSheetProps> = (props) => {
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
          <Container>
            <Wrapper>
              <Sheet ref={modalRef} role='dialog' className={className} {...restProps}>
                <StyledHeader>{header && header}</StyledHeader>
                <Content>{children}</Content>
              </Sheet>
            </Wrapper>
          </Container>
        </FocusTrap>
      </StyledBackground>
    </Portal>
  );
};

const Container = styled.div`
  margin: 0 16px;
  width: 100%;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-top: 0;
  padding-bottom: 8px;
  height: 100vh;
`;

const StyledBackground = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  background-color: ${colors.grayAlpha800};
  width: 100%;
  height: 100%;
`;

const Sheet = styled.div`
  position: relative;
  border-radius: 20px;
  background: ${colors.gray800};
  padding: 24px 0 16px;
  width: 100%;
  color: ${colors.gray10};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 8px;
`;

const StyledHeader = styled.button`
  display: flex;
`;
