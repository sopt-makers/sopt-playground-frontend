import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useOverlay } from '@toss/use-overlay';
import { ReactNode, useCallback } from 'react';

import Modal from '@/components/common/Modal';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const useAlert = () => {
  const { open, close } = useOverlay();

  const alert = useCallback(
    (options: {
      title: ReactNode;
      description: ReactNode;
      hideCloseButton?: boolean;
      buttonText?: string;
      buttonColor?: string;
      buttonTextColor?: string;
      maxWidth?: number;
      zIndex?: number;
    }) =>
      new Promise<boolean>((resolve) => {
        open(({ isOpen, close }) => (
          <Modal
            isOpen={isOpen}
            onClose={() => {
              resolve(false);
              close();
            }}
            hideCloseButton={options.hideCloseButton ?? false}
            zIndex={options.zIndex}
          >
            <StyledModalContent maxWidth={options.maxWidth}>
              <Modal.Title>{options.title}</Modal.Title>
              <StyleModalDescription>{options.description}</StyleModalDescription>
              <Modal.Footer align='right'>
                <StyledButton action='close' color={options.buttonTextColor} backgroundColor={options.buttonColor}>
                  {options.buttonText ?? '확인'}
                </StyledButton>
              </Modal.Footer>
            </StyledModalContent>
          </Modal>
        ));
      }),
    [open],
  );

  return { alert, close };
};

export default useAlert;

const StyledButton = styled(Modal.Button)<{ color?: string; backgroundColor?: string }>`
  background-color: ${(props) => props.backgroundColor ?? colors.gray700};
  width: max-content;
  color: ${(props) => props.color ?? colors.gray10};

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const StyledModalContent = styled(Modal.Content)<{ maxWidth?: number }>`
  min-width: 320px;
  max-width: ${({ maxWidth }) => maxWidth}px;
`;

const StyleModalDescription = styled.div`
  width: 100%;
`;
