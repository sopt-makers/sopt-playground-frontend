import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconCheck, IconChevronDown } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import { useEffect, useState } from 'react';

import { zIndex } from '@/styles/zIndex';

interface Option {
  label: string;
  value: string;
}

interface BottomSheetSelectProps {
  options: Option[];
  value: string | string[] | null | undefined;
  placeholder: string;
  onChange: (value: string) => void;
}
const BottomSheetSelect = ({ options, value, placeholder, onChange }: BottomSheetSelectProps) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const [temporaryValue, setTemporaryValue] = useState(value);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOptionSelect = (value: string) => {
    setTemporaryValue(value);
  };

  const handleConfirm = () => {
    setSelectedValue(temporaryValue);
    if (temporaryValue !== '') onChange(temporaryValue as string);

    handleClose();
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <Container>
      <InputField onClick={handleOpen}>
        {selectedValue !== null ? <p>{selectedValue}</p> : <p style={{ color: '#808087' }}>{placeholder}</p>}
        <IconChevronDown
          style={{
            width: 20,
            height: 20,
            transform: open ? 'rotate(-180deg)' : '',
            transition: 'all 0.5s',
          }}
        />
      </InputField>

      {open && (
        <>
          <Overlay onClick={handleClose} />
          <BottomSheet>
            <OptionList>
              {options.map((option) => (
                <OptionItem key={option.value} onClick={() => handleOptionSelect(option.value)}>
                  {option.label}
                  {temporaryValue === option.value && <CheckedIcon />}
                </OptionItem>
              ))}
            </OptionList>
            <Button size='lg' style={{ width: '100%' }} onClick={handleConfirm}>
              확인
            </Button>
          </BottomSheet>
        </>
      )}
    </Container>
  );
};
export default BottomSheetSelect;

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const InputField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  background-color: ${colors.gray800};
  cursor: pointer;
  padding: 11px 16px;
  ${fonts.BODY_16_M};
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
  ${fonts.BODY_14_M}
`;

const CheckedIcon = styled(IconCheck)`
  width: 24px;
  height: 24px;
  color: ${colors.success};
`;
