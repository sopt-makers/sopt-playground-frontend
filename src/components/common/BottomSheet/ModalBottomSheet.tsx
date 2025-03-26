import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { ComponentProps, FC, PropsWithChildren } from 'react';
import Sheet from 'react-modal-sheet';

import IconModalClose from '@/public/icons/icon-modal-close.svg';

export interface BottomSheetProps extends PropsWithChildren<ComponentProps<typeof Sheet>> {
  onClose: () => void;
}

export const ModalBottomSheet: FC<BottomSheetProps> = (props) => {
  const { children, isOpen, onClose, ...restProps } = props;

  return (
    <CustomSheet isOpen={isOpen} onClose={onClose} detent='content-height' {...restProps}>
      <Sheet.Container>
        <Sheet.Header>
          <StyledCloseButton onClick={onClose}>
            <StyledIconClose />
          </StyledCloseButton>
        </Sheet.Header>
        <Sheet.Content>{children}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} />
    </CustomSheet>
  );
};

const CustomSheet = styled(Sheet)`
  .react-modal-sheet-backdrop {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    justify-content: center;
    background-color: ${colors.grayAlpha800}!important;
    width: 100%;
    height: 100%;
  }

  .react-modal-sheet-container {
    border-radius: 14px !important;
    background-color: ${colors.gray900}!important;
    width: 100%;
    overflow-x: hidden !important;
    overflow-y: scroll !important;
  }

  .react-modal-sheet-header {
    display: flex;
  }

  .react-modal-sheet-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StyledCloseButton = styled.button`
  display: flex;
  position: absolute;
  top: 22px;
  right: 22px;
  align-items: center;
  justify-content: center;
  z-index: 3;
  cursor: pointer;
  padding: 4px;
`;

const StyledIconClose = styled(IconModalClose)``;
