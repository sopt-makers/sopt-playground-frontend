import styled from '@emotion/styled';
import { ChangeEvent, forwardRef, ReactElement, ReactNode, useState } from 'react';

import Select from '@/components/common/Select';
import { legacyColors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';
interface EditableSelectProps {
  onSelect: (value: string) => void;
  value: string;
  error?: boolean;
  count?: boolean;
  maxCount?: number;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
  placeholder?: string;
}

const EditableSelect = forwardRef<HTMLInputElement, EditableSelectProps>(
  ({ disabled = false, children, error, className, placeholder, onSelect }, ref) => {
    const [isEditable, setIsEditable] = useState(false);

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
      const editableOptionIndex = (children as ReactElement).props.options.length + 1;
      setIsEditable(e.target.selectedIndex === editableOptionIndex);
      onSelect(e.target.selectedIndex === editableOptionIndex ? '' : e.target.value);
    };

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
      onSelect(e.target.value);
    };

    return (
      <StyledContainer className={className}>
        <StyledSelect onChange={handleSelect} className={className} disabled={disabled} error={error}>
          {children}
          <option label='직접입력' />
        </StyledSelect>
        <StyledInput
          onChange={handleInput}
          placeholder={isEditable ? '직접입력' : placeholder}
          readOnly={!isEditable}
          ref={ref}
        />
      </StyledContainer>
    );
  },
);

export default EditableSelect;

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
`;

const StyledSelect = styled(Select)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: transparent;

  &:focus-visible {
    outline: none;
  }
`;

const StyledInput = styled.input`
  position: absolute;
  top: 0;
  left: 1.5px;
  border: none;
  background-color: transparent;
  padding: 11.5px;
  width: calc(100% - 40px);
  height: 100%;
  color: ${legacyColors.gray30};

  ${textStyles.SUIT_16_M}

  &:focus-visible {
    outline: none;
  }
`;
