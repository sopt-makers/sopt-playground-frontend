import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC, HTMLAttributes, PropsWithChildren, ReactNode, useRef } from 'react';
import Sheet from 'react-modal-sheet';

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
    <CustomSheet isOpen={isOpen} onClose={onClose} detent='content-height'>
      <Sheet.Container ref={modalRef}>
        <Sheet.Header>{header && header}</Sheet.Header>
        <Sheet.Content>{children}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </CustomSheet>
  );
};

const CustomSheet = styled(Sheet)`
  margin: 0 16px 42px;

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
    border-radius: 20px;
    background-color: ${colors.gray800}!important;
    padding: 24px 0 16px;
    width: 100%;
    max-height: 520px;
    overflow: scroll;
    color: ${colors.gray10};
  }

  .react-modal-sheet-header {
    display: flex;
  }

  .react-modal-sheet-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 8px;
  }
`;
