import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { useOverlay } from '@toss/use-overlay';
import { ReactNode, useCallback } from 'react';

import Modal from '@/components/common/Modal';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

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
      zIndex?: number;
      maxWidth?: number;
      hideCloseButton?: boolean;
    }) =>
      new Promise<boolean>((resolve) => {
        open(({ isOpen, close }) => (
          <Modal
            isOpen={isOpen}
            onClose={() => {
              resolve(false);
              close();
            }}
            zIndex={options.zIndex}
            hideCloseButton={true}
          >
            <StyledModalContent maxWidth={options.maxWidth}>
              <Modal.Title>{options.title}</Modal.Title>
              <StyleModalDescription>{options.description}</StyleModalDescription>
              <Modal.Footer align='right'>
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

const StyledModalContent = styled(Modal.Content)<{ maxWidth?: number }>`
  min-width: 320px;
  max-width: ${({ maxWidth }) => maxWidth}px;

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 324px;
  }
`;

const StyledOkButton = styled(Modal.Button)<{ color?: string; okButtonTextColor?: string }>`
  background: ${(props) => props.color ?? colors.white};
  color: ${(props) => props.okButtonTextColor ?? colors.black};
`;

const StyleModalDescription = styled.div`
  width: 100%;
  line-height: 26px;
  white-space: pre-wrap;
  color: ${colors.gray100};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fontsObject.BODY_3_14_R}
  }
`;
