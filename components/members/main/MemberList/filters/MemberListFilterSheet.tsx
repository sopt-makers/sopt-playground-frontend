import styled from '@emotion/styled';
import { Slot } from '@radix-ui/react-slot';
import { FC, PropsWithChildren, ReactNode, useState } from 'react';
import ReactModalSheet from 'react-modal-sheet';

import IconCheck from '@/public/icons/icon-filter-check.svg';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface Option {
  value: string;
  label: string;
}

interface MemberListFilterSheetProps {
  value?: string;
  onChange: (value: string) => void;
  options: Option[];
  defaultOption?: Option;
  placeholder: string;
  trigger: (placeholder?: string) => ReactNode;
}

const MemberListFilterSheet: FC<PropsWithChildren<MemberListFilterSheetProps>> = ({
  options,
  defaultOption,
  placeholder,
  trigger,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [label, onChangeLabel] = useState<Option['label']>();

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const onSelect = (option: Option) => {
    onChange(option.value);
    onChangeLabel(option.label);
    onClose();
  };

  return (
    <>
      {<Slot onClick={onOpen}>{trigger(label || placeholder)}</Slot>}
      <CustomSheet isOpen={isOpen} onClose={onClose} detent='content-height'>
        <ReactModalSheet.Container>
          <ReactModalSheet.Header />
          <ReactModalSheet.Content>
            {defaultOption && <StyledItem onClick={() => onSelect(defaultOption)}>{defaultOption.label}</StyledItem>}
            {options.map((option) => (
              <StyledItem key={option.value} onClick={() => onSelect(option)}>
                {option.label}
                {option.value === value && <IconCheck />}
              </StyledItem>
            ))}
          </ReactModalSheet.Content>
        </ReactModalSheet.Container>
        <ReactModalSheet.Backdrop onTap={onClose} />
      </CustomSheet>
    </>
  );
};

const CustomSheet = styled(ReactModalSheet)`
  .react-modal-sheet-container {
    background-color: ${colors.black60} !important;
  }

  .react-modal-sheet-header {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-color: ${colors.black60};
  }

  .react-modal-sheet-drag-indicator {
    width: 48px !important;
  }

  .react-modal-sheet-content {
    background-color: ${colors.black60};
    padding: 16px 24px 24px;
  }
`;

const StyledItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  ${textStyles.SUIT_16_SB};
`;

export default MemberListFilterSheet;
