import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useOverlay } from '@toss/use-overlay';
import { ReactNode, useCallback } from 'react';

import Modal from '@/components/common/Modal';

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
          >
            <StyledModalContent maxWidth={options.maxWidth}>
              <Modal.Title>{options.title}</Modal.Title>
              <StyleModalDescription>{options.description}</StyleModalDescription>
              <Modal.Footer align='stretch'>
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
  color: ${(props) => props.color ?? colors.gray10};
`;

const StyledModalContent = styled(Modal.Content)<{ maxWidth?: number }>`
  min-width: 320px;
  max-width: ${({ maxWidth }) => maxWidth}px;
`;

const StyleModalDescription = styled.div`
  width: 100%;
`;
