import styled from '@emotion/styled';
import { useOverlay } from '@toss/use-overlay';
import { ReactNode, useCallback } from 'react';

import Modal from '@/components/common/Modal';

const useAlert = () => {
  const { open, close } = useOverlay();

  const alert = useCallback(
    (options: { title: ReactNode; description: ReactNode }) =>
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
                <Modal.Button action='close'>확인</Modal.Button>
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

const StyledModalContent = styled(Modal.Content)`
  min-width: 320px;
`;

const StyleModalDescription = styled.div`
  width: 100%;
`;
