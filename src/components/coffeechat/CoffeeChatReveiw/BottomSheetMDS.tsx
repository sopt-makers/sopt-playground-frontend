import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconCheck, IconChevronDown } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import { ReactNode, useEffect, useState } from 'react';

import Portal from '@/components/common/Portal';
import { zIndex } from '@/styles/zIndex';

interface Option {
  label: string;
  value: number | undefined;
  desciption?: string;
}

interface BottomSheetSelectProps {
  options: Option[];
  defaultOption?: Option;
  value: string | null | undefined;
  placeholder: string;
  onChange: (value: string) => void;
  icon?: ReactNode;
  className?: string;
}

const BottomSheetMDS = ({
  options,
  defaultOption,
  value,
  placeholder,
  onChange,
  icon,
  className,
}: BottomSheetSelectProps) => {
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
    onChange(temporaryValue as string);

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

  const getSelectedLabel = (value: string) => {
    return options.find((option) => option.value === value)?.label;
  };

  return (
    <Container>
      <InputField onClick={handleOpen} className={className}>
        {selectedValue ? (
          <p>{getSelectedLabel(selectedValue)}</p>
        ) : (
          <p style={{ color: '#808087', whiteSpace: 'pre-wrap' }}>{placeholder}</p>
        )}

        {icon || (
          <IconChevronDown
            style={{
              width: 20,
              minWidth: 20,
              height: 20,
              minHeight: 20,
              transform: open ? 'rotate(-180deg)' : '',
              transition: 'all 0.5s',
            }}
          />
        )}
      </InputField>

      {open && (
        <Portal portalId='bottomsheet'>
          <Overlay />
          <BottomSheet>
            <OptionList>
              {defaultOption && (
                <OptionItem onClick={() => handleOptionSelect(defaultOption.value)}>
                  {defaultOption.label}
                  {temporaryValue === defaultOption.value && <CheckedIcon />}
                </OptionItem>
              )}
              {options.map((option) => (
                <OptionItem key={option.value} onClick={() => handleOptionSelect(option.value)}>
                  <StItemDiv>
                    {option.label}
                    <OptionSubItem>{option.description}</OptionSubItem>
                  </StItemDiv>
                  {temporaryValue === option.value && <CheckedIcon />}
                </OptionItem>
              ))}
            </OptionList>
            <Button size='lg' style={{ width: '100%' }} onClick={handleConfirm}>
              확인
            </Button>
          </BottomSheet>
        </Portal>
      )}
    </Container>
  );
};
export default BottomSheetMDS;

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const InputField = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  background-color: ${colors.gray800};
  cursor: pointer;
  padding: 11px 16px;
  ${fonts.BODY_16_M};

  max-width: calc(100vw - 40px);

  p {
    width: 100%;
    overflow: hidden; /* 넘치는 텍스트 숨김 */
    text-overflow: ellipsis;
    white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
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
  border-radius: 8px;
  cursor: pointer;
  padding: 10px;
  height: 66px;
  ${fonts.BODY_14_M}

  &:hover {
    background-color: ${colors.gray700};
  }
`;
const OptionSubItem = styled.div`
  margin-top: 2px;
  ${fonts.BODY_13_R}

  color:${colors.gray200}
`;

const CheckedIcon = styled(IconCheck)`
  width: 24px;
  height: 24px;
  color: ${colors.success};
`;
const StItemDiv = styled.div`
  width: 100%;
`;
