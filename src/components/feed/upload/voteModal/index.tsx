import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconPlus } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import { useEffect, useState } from 'react';

import Checkbox from '@/components/common/Checkbox';
import Modal, { ModalProps } from '@/components/common/Modal';
import CheckboxFormItem from '@/components/feed/upload/CheckboxFormItem';
import { MAX_FIELDS, MAX_LENGTH, MIN_FIELDS } from '@/components/feed/upload/voteModal/constants';
import VoteTextField from '@/components/feed/upload/voteModal/VoteTextField';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { zIndex } from '@/styles/zIndex';

interface VoteModalProps extends ModalProps {
  onSave: (options: string[], isMultiple: boolean) => void;
  options: string[];
  isMultiple: boolean;
}

const VoteModal = ({
  isOpen,
  onClose,
  onSave,
  options: initialOptions,
  isMultiple: initialIsMultiple,
}: VoteModalProps) => {
  const [options, setOptions] = useState<string[]>([]);
  const [isMultiple, setIsMultiple] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setOptions(initialOptions.length > 0 ? initialOptions : ['', '']);
      setIsMultiple(initialIsMultiple);
    }
  }, [isOpen, initialOptions, initialIsMultiple]);

  const handleAddField = () => {
    if (options.length < MAX_FIELDS) {
      setOptions((prev) => [...prev, '']);
    }
  };

  const handleRemoveField = (index: number) => {
    if (options.length > MIN_FIELDS) {
      setOptions((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleChangeField = (index: number, value: string) => {
    setOptions((prev) => prev.map((opt, i) => (i === index ? value : opt)));
  };

  const getValidOptions = () => options.map((o) => o.trim()).filter((o) => o !== '' && o.length <= MAX_LENGTH);
  const isAllOptionsValid = getValidOptions().length === options.length;

  const handleSave = () => {
    const validOptions = getValidOptions();
    onSave(validOptions, isMultiple);
    onClose();
  };

  return (
    <StyledModal isOpen={isOpen} onClose={onClose} zIndex={zIndex.헤더 + 100}>
      <StyledModalHeader> 투표 만들기</StyledModalHeader>
      <StyledModalContent>
        {options.map((value, index) => (
          <VoteTextField
            key={index}
            isRemovable={options.length > MIN_FIELDS}
            value={value}
            onChange={(val) => handleChangeField(index, val)}
            onRemove={() => handleRemoveField(index)}
          />
        ))}
        <Button
          LeftIcon={IconPlus}
          theme='black'
          variant='fill'
          onClick={handleAddField}
          disabled={options.length >= MAX_FIELDS}
        >
          응답 추가하기
        </Button>
      </StyledModalContent>
      <Divider />
      <StyledModalFooter>
        <CheckboxFormItem label='복수 선택 허용'>
          <Checkbox checked={isMultiple} onChange={() => setIsMultiple((prev) => !prev)} size='medium' />
        </CheckboxFormItem>
        <Button type='submit' theme='blue' size='sm' onClick={handleSave} disabled={!isAllOptionsValid}>
          완료
        </Button>
      </StyledModalFooter>
    </StyledModal>
  );
};

export default VoteModal;

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: ${colors.gray900};
  padding: 24px;
  width: 768px;

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 100%;
  }
`;

const StyledModalHeader = styled.div`
  ${fonts.TITLE_20_SB}
`;

const StyledModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Divider = styled.div`
  background-color: ${colors.gray600};
  width: 100%;
  height: 1px;
`;

const StyledModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
