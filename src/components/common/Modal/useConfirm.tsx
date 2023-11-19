import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useOverlay } from '@toss/use-overlay';
import { ReactNode, useCallback } from 'react';

import Modal from '@/components/common/Modal';

const useConfirm = () => {
  const { open, close } = useOverlay();

  const confirm = useCallback(
    (options: {
      title: ReactNode;
      description: ReactNode;
      cancelButtonText: string;
      okButtonText: string;
      okButtonColor?: string;
      okButtonTextColor?: string;
    }) =>
      new Promise<boolean>((resolve) => {
        open(({ isOpen, close }) => (
          <Modal
            isOpen={isOpen}
            onClose={() => {
              resolve(false);
              close();
            }}
          >
            <StyledModalContent>
              <Modal.Title>{options.title}</Modal.Title>
              <StyleModalDescription>{options.description}</StyleModalDescription>
              <Modal.Footer align='stretch'>
                <Modal.Button action='close'>{options.cancelButtonText}</Modal.Button>
                <StyledOkButton
                  color={options.okButtonColor}
                  okButtonTextColor={options.okButtonTextColor}
                  action='close'
                  onClick={() => resolve(true)}
                >
                  {options.okButtonText}
                </StyledOkButton>
              </Modal.Footer>
            </StyledModalContent>
          </Modal>
        ));
      }),
    [open],
  );

  return { confirm, close };
};

export default useConfirm;

const StyledModalContent = styled(Modal.Content)`
  min-width: 320px;
`;

const StyledOkButton = styled(Modal.Button)<{ color?: string; okButtonTextColor?: string }>`
  background-color: ${(props) => props.color ?? colors.white};
  color: ${(props) => props.okButtonTextColor ?? colors.black};
`;

const StyleModalDescription = styled.div`
  width: 100%;
`;
