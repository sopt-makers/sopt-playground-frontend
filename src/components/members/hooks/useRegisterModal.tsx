import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useOverlay } from '@toss/use-overlay';
import { ReactNode, useCallback } from 'react';
import Modal from '@/components/common/Modal';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const useRegisterModal = () => {
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
      className?: string;
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
            style={{ minWidth: '310px', maxWidth: options.maxWidth, width: 'calc(100% - 60px)' }}
          >
            <ModalContent>
              <ModalTitle>{options.title}</ModalTitle>
              <ModalDescription>{options.description}</ModalDescription>
              <Modal.Footer align='stretch' stack='vertical'>
                <OkButton
                  color={options.okButtonColor}
                  okButtonTextColor={options.okButtonTextColor}
                  action='close'
                  onClick={() => resolve(true)}
                >
                  {options.okButtonText}
                </OkButton>
                <CancelButton action='close'>{options.cancelButtonText}</CancelButton>
              </Modal.Footer>
            </ModalContent>
          </Modal>
        ));
      }),
    [open],
  );

  return { confirm, close };
};

export default useRegisterModal;

const ModalTitle = styled(Modal.Title)`
  text-align: center;
  line-height: 130%; /* 26px */
  letter-spacing: -0.2px;
  color: ${colors.gray10};
  font-size: 20px;
  font-weight: 700;

  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 18px;
  }
`;

const ModalDescription = styled.div`
  width: 100%;
  text-align: center;
  line-height: 150%; /* 21px */
  white-space: pre-wrap;
  color: ${colors.gray300};
  font-size: 14px;
  font-weight: 600;
`;

const ModalContent = styled(Modal.Content)<{ maxWidth?: number }>`
  padding: 30px 30px 24px;
`;

const OkButton = styled(Modal.Button)<{ color?: string; okButtonTextColor?: string }>`
  background-color: ${(props) => props.color ?? colors.white};
  color: ${(props) => props.okButtonTextColor ?? colors.black};
`;

const CancelButton = styled(Modal.Button)`
  margin-top: 14px;
  background: none;
  padding: 0;
  height: fit-content;
  line-height: 100%;
  letter-spacing: -0.14px;
  color: ${colors.gray400};
  font-size: 14px;
  font-weight: 500;
`;
