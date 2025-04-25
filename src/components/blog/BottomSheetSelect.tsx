import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconCheck, IconChevronDown } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import { useState } from 'react';

import Portal from '@/components/common/Portal';
import { textStyles } from '@/styles/typography';
import { zIndex } from '@/styles/zIndex';

interface BottomSheetCloseProps {
  placeholder: string;
  options: { value: string; label: string }[];
  value: string;
  onSelect: (option: { value: string; label: string }) => void;
}
const BottomSheetSelect = ({ placeholder, options, value, onSelect }: BottomSheetCloseProps) => {
  const [temporaryValue, setTemporaryValue] = useState<{ value: string; label: string }>();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  const handleConfirm = () => {
    if (temporaryValue) onSelect(temporaryValue);
    handleClose();
  };
  return (
    <>
      <InputField onClick={handleOpen}>
        {value !== '' ? (
          <p>{options.find((o) => o.value === value)?.label}</p>
        ) : (
          <p style={{ color: colors.gray300 }}>{placeholder}</p>
        )}
        <IconChevronDown
          style={{
            width: 20,
            height: 20,
            transform: isOpen ? 'rotate(-180deg)' : '',
            transition: 'all 0.5s',
          }}
        />
      </InputField>
      {isOpen && (
        <Portal portalId='bottomsheet'>
          <Overlay onClick={handleClose} />
          <BottomSheet>
            <OptionList>
              {options.map((option) => (
                <OptionItem key={option.value} onClick={() => setTemporaryValue(option)}>
                  {option.label}
                  {temporaryValue === option && <CheckedIcon />}
                </OptionItem>
              ))}
            </OptionList>
            <Button size='lg' style={{ width: '100%' }} onClick={handleConfirm}>
              확인
            </Button>
          </BottomSheet>
        </Portal>
      )}
    </>
  );
};

export default BottomSheetSelect;

const InputField = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  background-color: ${colors.gray800};
  cursor: pointer;
  padding: 11px 16px;
  width: 100%;

  p {
    ${textStyles.SUIT_16_M};
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${zIndex.헤더};
  background-color: rgb(15 15 18 / 80%);
  width: 100%;
  height: 100%;
`;

const BottomSheet = styled.section`
  position: fixed;
  bottom: 0;
  left: 20px;
  z-index: ${zIndex.헤더};
  margin-bottom: 12px;
  border-radius: 16px;
  background-color: ${colors.gray800};
  padding: 16px;
  width: calc(100% - 40px);
`;

const OptionList = styled.ul`
  margin: 0 0 16px;
  padding: 0;
  max-height: 300px;
  overflow-y: auto;
  list-style: none;
`;

const OptionItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  cursor: pointer;
  padding: 10px;
  height: 44px;
`;

const CheckedIcon = styled(IconCheck)`
  width: 24px;
  height: 24px;
  color: ${colors.success};
`;
