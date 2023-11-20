import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { ComponentProps, FC, PropsWithChildren, ReactNode } from 'react';
import Sheet from 'react-modal-sheet';

export interface BottomSheetProps extends PropsWithChildren<ComponentProps<typeof Sheet>> {
  header?: ReactNode;
  onClose: () => void;
}

export const BottomSheet: FC<BottomSheetProps> = (props) => {
  const { header, children, isOpen, onClose, ...restProps } = props;

  return (
    <CustomSheet isOpen={isOpen} onClose={onClose} detent='content-height' {...restProps}>
      <Sheet.Container>
        {header && <Sheet.Header>{header}</Sheet.Header>}
        <Sheet.Content>{children}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} />
    </CustomSheet>
  );
};

const CustomSheet = styled(Sheet)`
  margin: 0 16px 42px;

  .react-modal-sheet-backdrop.react-modal-sheet-backdrop {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    justify-content: center;
    background-color: ${colors.grayAlpha800};
    width: 100%;
    height: 100%;
  }

  .react-modal-sheet-container.react-modal-sheet-container {
    border-radius: 20px;
    background-color: ${colors.gray800};
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
