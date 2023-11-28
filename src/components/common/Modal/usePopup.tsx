import styled from '@emotion/styled';
import { useOverlay } from '@toss/use-overlay';
import { ReactNode, useCallback } from 'react';

import Modal from '@/components/common/Modal';

const usePopup = () => {
  const { open, close } = useOverlay();

  const popup = useCallback(
    (options: { icon: string; title: ReactNode; description: ReactNode; maxWidth?: number; zIndex?: number }) =>
      new Promise<boolean>((resolve) => {
        open(({ isOpen, close }) => (
          <Modal
            isOpen={isOpen}
            onClose={() => {
              resolve(false);
              close();
            }}
            hideCloseButton
            zIndex={options.zIndex}
          >
            <StyledPopupContent maxWidth={options.maxWidth}>
              <StyledIcon icon={options.icon} />
              <StyledContentWrapper>
                <Modal.Title>{options.title}</Modal.Title>
                <StylePopupDescription>{options.description}</StylePopupDescription>
              </StyledContentWrapper>
            </StyledPopupContent>
          </Modal>
        ));
      }),
    [open],
  );

  return { popup, close };
};

export default usePopup;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledIcon = styled.div<{ icon: string }>`
  content: url(${({ icon }) => icon});
`;

const StyledPopupContent = styled(Modal.Content)<{ maxWidth?: number }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  min-width: 320px;
  max-width: ${({ maxWidth }) => maxWidth}px;
`;

const StylePopupDescription = styled.div`
  width: 100%;
`;
